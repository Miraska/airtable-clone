const fs = require("fs");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { File } = require("../models/entities");

// Имя бакета в Яндекс Облаке
const BUCKET_NAME = "airtable-clone";

// Инициализация клиента S3 с поддержкой UTF-8
const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: "https://storage.yandexcloud.net",
});

// Функция установки заголовка для корректной кодировки ответа
function setUtf8Header(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
}

// Создание (Загрузка) одного файла
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      setUtf8Header(res);
      return res.status(400).json({ message: "Файл не был предоставлен" });
    }

    if (!fs.existsSync(req.file.path)) {
      setUtf8Header(res);
      return res
        .status(400)
        .json({ message: "Файл не найден во временном хранилище" });
    }

    const fileContent = fs.readFileSync(req.file.path);
    const type = req.file.mimetype;

    const params = {
      Bucket: BUCKET_NAME,
      Key: req.file.originalname,
      Body: fileContent,
      ContentType: type,
    };

    console.log("Загрузка файла с параметрами:", params);

    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);

    fs.unlinkSync(req.file.path); // Удаляем временный файл

    const fileUrl = `https://${BUCKET_NAME}.storage.yandexcloud.net/${encodeURIComponent(params.Key)}`;
    console.log("Загрузка успешна:", result);

    const { orderId, type: fileType } = req.body || {};
    const newFile = await File.create({
      fileName: req.file.originalname,
      fileUrl,
      orderId: orderId || null,
      type: fileType || null,
    });

    setUtf8Header(res);
    res.json({ message: "Файл успешно загружен", file: newFile });
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);
    setUtf8Header(res);
    res
      .status(500)
      .json({ message: "Не удалось загрузить файл", error: error.message });
  }
};

// Создание (Загрузка) нескольких файлов
exports.uploadMultipleFiles = async (req, res) => {
  try {
    const { orderId, type: fileType } = req.body;

    if (!orderId) {
      setUtf8Header(res);
      return res.status(400).json({ message: "orderId обязателен" });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      const fileContent = fs.readFileSync(file.path);

      const params = {
        Bucket: BUCKET_NAME,
        Key: file.originalname,
        Body: fileContent,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      fs.unlinkSync(file.path);

      const fileUrl = `https://${BUCKET_NAME}.storage.yandexcloud.net/${encodeURIComponent(file.originalname)}`;

      const newFile = await File.create({
        fileName: file.originalname,
        fileUrl,
        orderId,
        type: fileType || null,
      });

      uploadedFiles.push(newFile);
    }

    setUtf8Header(res);
    res.json({ message: "Файлы успешно загружены", files: uploadedFiles });
  } catch (error) {
    console.error(error);
    setUtf8Header(res);
    res
      .status(500)
      .json({ message: "Не удалось загрузить файлы", error: error.message });
  }
};

// Чтение (Получение одного файла по имени)
exports.getFileByName = async (req, res) => {
  try {
    const { fileName } = req.params;

    const fileRecord = await File.findOne({ where: { fileName } });
    if (!fileRecord) {
      setUtf8Header(res);
      return res.status(404).json({ message: "Файл не найден в базе данных" });
    }

    setUtf8Header(res);
    res.json({ file: fileRecord });
  } catch (error) {
    console.error(error);
    setUtf8Header(res);
    res
      .status(500)
      .json({ message: "Не удалось получить файл", error: error.message });
  }
};

// Чтение (Получение одного файла по id)
exports.getFileById = async (req, res) => {
  try {
    const { id } = req.params;

    const fileRecord = await File.findByPk(id);
    if (!fileRecord) {
      setUtf8Header(res);
      return res.status(404).json({ message: "Файл не найден в базе данных" });
    }

    setUtf8Header(res);
    res.json({ file: fileRecord });
  } catch (error) {
    console.error(error);
    setUtf8Header(res);
    res
      .status(500)
      .json({ message: "Не удалось получить файл", error: error.message });
  }
};

// Чтение (Получение всех файлов)
exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.findAll();
    setUtf8Header(res);
    res.json({ files });
  } catch (error) {
    console.error(error);
    setUtf8Header(res);
    res
      .status(500)
      .json({ message: "Не удалось получить файлы", error: error.message });
  }
};

// Чтение (Получение файлов по типу)
exports.getFilesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const files = await File.findAll({ where: { type } });
    if (!files || files.length === 0) {
      setUtf8Header(res);
      return res
        .status(404)
        .json({ message: "Не найдено файлов для данного типа" });
    }
    setUtf8Header(res);
    res.json({ files });
  } catch (error) {
    console.error(error);
    setUtf8Header(res);
    res
      .status(500)
      .json({
        message: "Не удалось получить файлы по типу",
        error: error.message,
      });
  }
};

// Чтение (Получение файлов по orderId)
exports.getFilesByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const files = await File.findAll({ where: { orderId } });
    if (!files || files.length === 0) {
      setUtf8Header(res);
      return res
        .status(404)
        .json({ message: "Не найдено файлов для данного orderId" });
    }
    setUtf8Header(res);
    res.json({ files });
  } catch (error) {
    console.error(error);
    setUtf8Header(res);
    res
      .status(500)
      .json({
        message: "Не удалось получить файлы по orderId",
        error: error.message,
      });
  }
};

// Обновление (Update) информации о файле
exports.updateFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId, type: fileType } = req.body;

    const fileRecord = await File.findByPk(id);
    if (!fileRecord) {
      setUtf8Header(res);
      return res.status(404).json({ message: "Файл не найден в базе данных" });
    }

    if (orderId !== undefined) fileRecord.orderId = orderId;
    if (fileType !== undefined) fileRecord.type = fileType;

    await fileRecord.save();

    setUtf8Header(res);
    res.json({ message: "Файл успешно обновлен", file: fileRecord });
  } catch (error) {
    console.error(error);
    setUtf8Header(res);
    res
      .status(500)
      .json({ message: "Не удалось обновить файл", error: error.message });
  }
};

// Удаление (Delete) файла по имени
exports.deleteFileByName = async (req, res) => {
  try {
    const { fileName } = req.params;

    const fileRecord = await File.findOne({ where: { fileName } });
    if (!fileRecord) {
      setUtf8Header(res);
      return res.status(404).json({ message: "Файл не найден в базе данных" });
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileRecord.fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    await fileRecord.destroy();

    setUtf8Header(res);
    res.json({ message: `Файл ${fileName} успешно удален` });
  } catch (error) {
    console.error(error);
    setUtf8Header(res);
    res
      .status(500)
      .json({ message: "Не удалось удалить файл", error: error.message });
  }
};

// Удаление файла по id
exports.deleteFileById = async (req, res) => {
  try {
    const { id } = req.params;

    const fileRecord = await File.findByPk(id);
    if (!fileRecord) {
      setUtf8Header(res);
      return res.status(404).json({ message: "Файл не найден в базе данных" });
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileRecord.fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    await fileRecord.destroy();

    setUtf8Header(res);
    res.json({ message: `Файл с id ${id} успешно удален` });
  } catch (error) {
    console.error(error);
    setUtf8Header(res);
    res
      .status(500)
      .json({ message: "Не удалось удалить файл", error: error.message });
  }
};

// Удаление всех файлов
exports.deleteAllFiles = async (req, res) => {
  try {
    const files = await File.findAll();

    if (files.length === 0) {
      setUtf8Header(res);
      return res.status(404).json({ message: "Нет файлов для удаления" });
    }

    for (const fileRecord of files) {
      const params = {
        Bucket: BUCKET_NAME,
        Key: fileRecord.fileName,
      };
      const command = new DeleteObjectCommand(params);
      await s3Client.send(command);
    }

    await File.destroy({ where: {} });

    setUtf8Header(res);
    res.json({ message: "Все файлы успешно удалены" });
  } catch (error) {
    console.error(error);
    setUtf8Header(res);
    res
      .status(500)
      .json({ message: "Не удалось удалить все файлы", error: error.message });
  }
};
