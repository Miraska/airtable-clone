const fs = require("fs");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { File } = require("../models/entities"); // Подключаем модель файла

// Имя бакета в яндекс облаке
const BUCKET_NAME = "airtable-clone";

// Инициализация клиента S3
const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: "https://storage.yandexcloud.net",
});

// Загрузка файла
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

    res.json({ message: "File uploaded successfully", fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .json({ message: "Failed to upload file", error: error.message });
  }
};

// Загрузка нескольких файлов
exports.uploadMultipleFiles = async (req, res) => {
  try {
    const { orderId } = req.body; // Получаем orderId из тела запроса

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
        orderId, // Привязываем к orderId
      });

      uploadedFiles.push(newFile); // Добавляем данные о файле в массив
    }

    res.json({ message: "Files uploaded successfully", files: uploadedFiles });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to upload files", error: error.message });
  }
};

// Удаление файла
exports.deleteFile = async (req, res) => {
  try {
    const { fileName } = req.params;

    const fileRecord = await File.findOne({ where: { fileName } });
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found in database" });
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    await fileRecord.destroy(); // Удаляем запись из базы данных

    res.json({ message: `File ${fileName} deleted successfully` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete file", error: error.message });
  }
};

// Получение ссылки на файл
exports.getFileLink = async (req, res) => {
  try {
    const { fileName } = req.params;

    const fileRecord = await File.findOne({ where: { fileName } });
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found in database" });
    }

    res.json({ fileName: fileRecord.fileName, fileUrl: fileRecord.fileUrl });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get file link", error: error.message });
  }
};
