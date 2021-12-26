
const express = require('express');
const path = require('path');

const app = express();

const root = path.join(__dirname, 'dist');
  //express.use static with the directory
app.use(express.static(root));

app.get('*', function (req, res) {
  const index = path.join(__dirname, 'src', 'index.html');
  res.sendFile(index);
});


app.listen(process.env.PORT || 8080);