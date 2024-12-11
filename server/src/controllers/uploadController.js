const fs = require("fs");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { File } = require("../models/entities"); // Подключаем модель файла

// Имя бакета в Яндекс Облаке
const BUCKET_NAME = "airtable-clone";

// Инициализация клиента S3
const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: "https://storage.yandexcloud.net",
});

// Создание (Загрузка) одного файла
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    if (!fs.existsSync(req.file.path)) {
      return res
        .status(400)
        .json({ message: "File not found in local storage" });
    }

    const fileContent = fs.readFileSync(req.file.path);
    const type = req.file.mimetype;

    const params = {
      Bucket: BUCKET_NAME,
      Key: req.file.originalname,
      Body: fileContent,
      ContentType: type,
    };

    console.log("Uploading file with params:", params);

    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);

    fs.unlinkSync(req.file.path); // Удаляем временный файл

    const fileUrl = `https://${BUCKET_NAME}.storage.yandexcloud.net/${params.Key}`;
    console.log("Upload successful:", result);

    // Если вам нужно сохранять в БД — добавьте запись о файле в таблицу File
    // Если в модели есть поля orderId или type, можете передать их через req.body
    const { orderId, type: fileType } = req.body || {};
    const newFile = await File.create({
      fileName: req.file.originalname,
      fileUrl,
      orderId: orderId || null,
      type: fileType || null,
    });

    res.json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .json({ message: "Failed to upload file", error: error.message });
  }
};

// Создание (Загрузка) нескольких файлов
exports.uploadMultipleFiles = async (req, res) => {
  try {
    const { orderId, type: fileType } = req.body; // Получаем orderId/type из тела запроса

    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      const fileContent = fs.readFileSync(file.path); // Читаем файл из временного хранилища

      const params = {
        Bucket: BUCKET_NAME,
        Key: file.originalname, // Имя файла
        Body: fileContent, // Содержимое файла
        ContentType: file.mimetype, // MIME-тип файла
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command); // Загружаем файл в облачное хранилище

      fs.unlinkSync(file.path); // Удаляем временный файл после загрузки

      // Генерируем URL для доступа к файлу
      const fileUrl = `https://${BUCKET_NAME}.storage.yandexcloud.net/${encodeURIComponent(
        file.originalname
      )}`;

      // Сохраняем запись в базе данных
      const newFile = await File.create({
        fileName: file.originalname,
        fileUrl,
        orderId,
        type: fileType || null,
      });

      uploadedFiles.push(newFile);
    }

    res.json({ message: "Files uploaded successfully", files: uploadedFiles });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to upload files", error: error.message });
  }
};

// Чтение (Получение одного файла по имени)
exports.getFileByName = async (req, res) => {
  try {
    const { fileName } = req.params;

    const fileRecord = await File.findOne({ where: { fileName } });
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found in database" });
    }

    res.json({ file: fileRecord });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get file", error: error.message });
  }
};

// Чтение (Получение одного файла по id)
exports.getFileById = async (req, res) => {
  try {
    const { id } = req.params;

    const fileRecord = await File.findByPk(id);
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found in database" });
    }

    res.json({ file: fileRecord });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get file", error: error.message });
  }
};

// Чтение (Получение всех файлов)
exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.findAll();
    res.json({ files });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get files", error: error.message });
  }
};

// Чтение (Получение файлов по типу)
exports.getFilesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const files = await File.findAll({ where: { type } });
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No files found for this type" });
    }
    res.json({ files });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get files by type", error: error.message });
  }
};

// Чтение (Получение файлов по orderId)
exports.getFilesByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const files = await File.findAll({ where: { orderId } });
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No files found for this orderId" });
    }
    res.json({ files });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get files by orderId", error: error.message });
  }
};

// Обновление (Update) информации о файле (например, сменить orderId или type)
exports.updateFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId, type: fileType } = req.body;

    const fileRecord = await File.findByPk(id);
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found in database" });
    }

    // Обновляем нужные поля
    if (orderId !== undefined) fileRecord.orderId = orderId;
    if (fileType !== undefined) fileRecord.type = fileType;

    await fileRecord.save();

    res.json({ message: "File updated successfully", file: fileRecord });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update file", error: error.message });
  }
};

// Удаление (Delete) файла по имени
exports.deleteFileByName = async (req, res) => {
  try {
    const { fileName } = req.params;

    const fileRecord = await File.findOne({ where: { fileName } });
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found in database" });
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileRecord.fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    await fileRecord.destroy();

    res.json({ message: `File ${fileName} deleted successfully` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete file", error: error.message });
  }
};

// Удаление файла по id
exports.deleteFileById = async (req, res) => {
  try {
    const { id } = req.params;

    const fileRecord = await File.findByPk(id);
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found in database" });
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileRecord.fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    await fileRecord.destroy();

    res.json({ message: `File with id ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete file", error: error.message });
  }
};
