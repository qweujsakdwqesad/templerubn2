const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const readline = require('readline');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Received upload request');
  if (req.file) {
    const filePath = `uploads/${req.file.filename}`;
    console.log('File uploaded:', req.file);
    res.redirect(`/uploads/${req.file.filename}`);
  } else {
    console.error('No file uploaded');
    res.status(400).send('No file uploaded');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Press "o" and then "Enter" to open the URL in the browser.`);

  // Setup readline to listen for key presses
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'o') {
      // Open the URL in the default browser
     
      console.log('Opening the browser...');
    }
  });
});
