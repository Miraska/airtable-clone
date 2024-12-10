const express = require('express'); 
const multer = require('multer'); 
const fs = require('fs'); 
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3'); 

const router = express.Router(); 
const upload = multer({ dest: 'uploads/' }); 

const s3Client = new S3Client({ 
  region: 'ru-central1', 
  endpoint: 'https://storage.yandexcloud.net',
  
}); 

const BUCKET_NAME = 'airtable-clone'; 

router.post('/', upload.single('file'), async (req, res) => { 
  try { 
    if (!req.file) { 
      return res.status(400).json({ message: 'No file provided' }); 
    } 

    const fileContent = fs.readFileSync(req.file.path); 
    const params = { 
      Bucket: BUCKET_NAME, 
      Key: req.file.originalname, 
      Body: fileContent, 
      ContentType: req.file.mimetype, 
    }; 

    const command = new PutObjectCommand(params); 
    await s3Client.send(command); 

    fs.unlinkSync(req.file.path); 

    const fileUrl = `https://${BUCKET_NAME}.storage.yandexcloud.net/${encodeURIComponent(req.file.originalname)}`; 
    res.json({ message: 'File uploaded successfully', fileUrl }); 
  } catch (error) { 
    console.error(error); 
    res.status(500).json({ message: 'Failed to upload file', error: error.message }); 
  } 
}); 

module.exports = router;
