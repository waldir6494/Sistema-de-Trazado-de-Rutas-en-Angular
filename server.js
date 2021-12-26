/* 
const express = require('express');
const path = require('path');

const app = express();


app.use(express.static('./dist/front_proyecto'));

app.get('*', function (req, res) {
  const index = path.join(__dirname, 'src', 'index.html');
  res.sendFile(index);
});


app.listen(process.env.PORT || 8080); */


const express = require('express');
const cors = require('cors');
const path = require('path');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//STATIC
  // get directory where is index.html
const root = path.join(__dirname, 'client', 'build');
  //express.use static with the directory
app.use(express.static(root));
  //express get request any (*) root, please use file that is on root directory configure above.

app.get('*', function (req, res) {
    const index = path.join(__dirname, 'src', 'index.html');
    res.sendFile(index);
});


//Dynamic Api

app.use('/api/', testimonialsRoutes);
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});