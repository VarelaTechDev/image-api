require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

const aiFolderPath = process.env.AI_FOLDER_PATH; // Read AI folder path from environment variable

app.use(cors()); // Enable CORS

app.get('/ai/:folder?', (req, res) => {
  const folder = req.params.folder;
  const folderPath = folder ? path.join(aiFolderPath, folder) : aiFolderPath;
  
  fs.stat(folderPath, (err, stats) => {
    if (err) {
      return res.status(404).send({
        error: `Path '${folder}' not found`,
      });
    }
    
    if (stats.isDirectory()) {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          return res.status(500).send({
            error: "Unable to scan directory: " + err,
          });
        }
        
        if (files.length === 0) {
          return res.status(404).send({
            error: folder ? `No images found in '${folder}' folder` : "No images found",
          });
        }
        
        const randomImage = files[Math.floor(Math.random() * files.length)];
        const imageUrl = `${req.protocol}://${req.get('host')}/ai/${folder ? folder + '/' : ''}${randomImage}`;
        
        console.log(imageUrl)
        res.json({ url: imageUrl });
      });
    } else if (stats.isFile()) {
      const imageUrl = `${req.protocol}://${req.get('host')}/ai/${folder}`;
      console.log(imageUrl)
      res.json({ url: imageUrl });
    } else {
      return res.status(500).send({
        error: `Path '${folder}' is neither a file nor a directory`,
      });
    }
  });
});


app.use('/ai', express.static(aiFolderPath));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
