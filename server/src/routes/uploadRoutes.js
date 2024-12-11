const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), fileController.uploadFile);
router.post("/upload-multiple", upload.array("files"), fileController.uploadMultipleFiles);


router.delete("/:fileName", fileController.deleteFile);
router.get("/:fileName", fileController.getFileLink);

module.exports = router;
