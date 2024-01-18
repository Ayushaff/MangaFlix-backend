const File = require('../models/fileModel');

const fileController = {
  uploadFile: async (req, res) => {
    try {
      const file = req.file;

      const savedFile = await File.create({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer,
      });

      console.log(savedFile);

      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error uploading file:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = fileController;
