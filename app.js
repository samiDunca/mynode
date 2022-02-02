const express = require('express');
const concertRout = require('./routes/concertRoutes');
const fanRout = require('./routes/fanRoutes');
var cors = require('cors');
const path = require('path');
// const bodyParser = require('body-parser'); //module that help us handle the request parameter before it arives in the middleware
// const Concert = require('./models/concertModel');

const app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(express.static('../concerts'));

app.use(express.json());

// app.get('/*', function (req, res) {
//   res.sendFile(path.join('/concerts'));
// });

app.use('/api/v1/concerts', concertRout);
app.use('/api/v1/fans', fanRout);

module.exports = app;
