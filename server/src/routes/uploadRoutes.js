const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Создание
router.post("/files/", upload.single("file"), fileController.uploadFile);
router.post("/files/upload-multiple", upload.array("files"), fileController.uploadMultipleFiles);

// Чтение
router.get("/files/", fileController.getAllFiles);
router.get("/files/id/:id", fileController.getFileById);
router.get("/files/name/:fileName", fileController.getFileByName);
router.get("/files/type/:type", fileController.getFilesByType);
router.get("/files/order/:orderId", fileController.getFilesByOrderId);

// Обновление
router.put("/files/:id", fileController.updateFileById);

// Удаление
router.delete("/files/name/:fileName", fileController.deleteFileByName);
router.delete("/files/id/:id", fileController.deleteFileById);

module.exports = router;
