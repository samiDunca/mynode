const express = require('express');
const bodyParser = require('body-parser'); //module that help us handle the request parameter before it arives in the middleware
const fs = require('fs');
const concertRout = require('./routes/concertRoutes');

const app = express();
app.use(express.json());

///////////////////////////////
///////////////////////////////
app.set('view engine', 'ejs'); //engine for templating
// acest use ii folosit pentru toate middleware-urile
app.use('/api/v1/assets', express.static('assets')); //for static files like stylesheet

var urlencodedParser = bodyParser.urlencoded({ extended: false }); //invoc function in the middleware to parse our post data

const concerts = JSON.parse(fs.readFileSync(`${__dirname}/data/database.json`));

// Display concert form
app.get('/api/v1/concert', (req, res) => {
  res.render('profile', { gs: req.query });
});

// Create concert from form
app.post('/api/v1/concert', urlencodedParser, (req, res) => {
  const newId = concerts[concerts.length - 1].id + 1;
  const newConcert = Object.assign({ id: newId }, req.body);
  console.log(newConcert);
  concerts.push(newConcert);
  fs.writeFile(
    `${__dirname}/data/database.json`,
    JSON.stringify(concerts),
    (err) => {
      res.render('profile', { gs: req.query });
    }
  );
});
///////////////////////////////
///////////////////////////////

app.use('/api/v1/concerts', concertRout);

module.exports = app;

// Cod learn fetch in 6 minutes
// fetch('https://regres.in/api/users', {
//   method: 'POST',
//   headers: {
//     'Content-type': 'application/json',
//   },
//   body: JSON.stringify({
//     name: 'User 1',
//   }),
// })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => console.log(data))
//   .catch((err) => console.log('error'));

///////////////////////////////÷÷////÷÷/////////////÷÷//÷//÷÷÷÷÷÷÷÷÷÷÷÷÷//
///////////////////////CALCULATOR DE LITERE////////÷÷////÷÷/////////////
///////////////////////////////÷÷////÷÷/////////////÷÷//÷//÷÷÷÷÷÷÷÷÷÷÷÷÷//
///////////////////////////////÷÷////÷÷/////////////÷÷//÷//÷÷÷÷÷÷÷÷÷÷÷÷÷//
///////////////////////////////÷÷////÷÷/////////////÷÷//÷//÷÷÷÷÷÷÷÷÷÷÷÷÷//
///////////////////////////////÷÷////÷÷/////////////÷÷//÷//÷÷÷÷÷÷÷÷÷÷÷÷÷//
///////////////////////////////÷÷////÷÷/////////////÷÷//÷//÷÷÷÷÷÷÷÷÷÷÷÷÷//
///////////////////////////////÷÷////÷÷/////////////÷÷//÷//÷÷÷÷÷÷÷÷÷÷÷÷÷//
///////////////////////////////÷÷////÷÷/////////////÷÷//÷//÷÷÷÷÷÷÷÷÷÷÷÷÷//
///////////////////////////////÷÷////÷÷/////////////÷÷//÷//÷÷÷÷÷÷÷÷÷÷÷÷÷//
// const alphabet = [{}];
// for (var i = 0; i < 25; i++) {
//   alphabet.push({ caracter: String.fromCharCode(i + 65), aparitii: 0 });
//   //   console.log(alphabet);
// }
// const textIn = fs.readFileSync('./data/dumi.txt', 'utf-8');

// for (i = 0; i < textIn.length; i++) {
//   var q = textIn[i].charCodeAt();
//   //   console.log(q - 65);
//   console.log(alphabet[q - 64]);
//   if (textIn[i] != ' ')
//     if (q > 90) alphabet[q - 96].aparitii++;
//     else alphabet[q - 64].aparitii++;
// }
// const data = new Array();
// data.push('Finally');

// alphabet.forEach((el) => {
//   if (el.aparitii !== 0) {
//     data.push(`${el.caracter} ~ ${el.aparitii}`);
//   }
// });
// console.log(data);
// fs.writeFileSync('./data/lettersEncounter.txt', data.join(`\n`), 'utf-8');
