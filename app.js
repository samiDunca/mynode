const express = require('express');
var cors = require('cors');
// const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const concertRout = require('./routes/concertRoutes');
const fanRout = require('./routes/fanRoutes');
const memberRout = require('./routes/memberRoutes');
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
app.use('/api/v1/members', memberRout);

//app.all for all (get, post, del..)
app.all('*', (req, res, next) => {
  //whatever we pass in the next() it's consider an error
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
