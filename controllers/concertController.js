const fs = require('fs');

const concerts = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/database.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  // const idSearch = concerts.filter((el) => el.concerts === id);
  // console.log(idSearch);
  if (req.params.id * 1 >= concerts.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllConcerts = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      concert: concerts,
    },
  });
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
};
exports.createConcert = (req, res) => {
  const newId = concerts[concerts.length - 1].id + 1;
  const newConcert = Object.assign({ id: newId }, req.body);
  console.log(newConcert);
  concerts.push(newConcert);
  fs.writeFile(
    `${__dirname}/../data/database.json`,
    JSON.stringify(concerts),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          concert: newConcert,
        },
      });
    }
  );
};

exports.getConcert = (req, res) => {
  const id = req.params.id * 1;

  const concert = concerts.find((el) => el.id === id);
  console.log(concert);
  res.status(200).json({
    status: 'success',
    data: {
      concert: concert,
    },
  });
};
exports.updateConcert = (req, res) => {
  const id = req.params.id * 1;
  // const data = req.body.data;
  const city = req.body.city;
  // const capacity = req.body.capacity;
  // const soldTickets = req.body.soldTickets;
  const index = concerts.findIndex((concert) => {
    return concert.id === id;
  });
  if (index >= 0) {
    let cnst = concerts[index];
    // cnst.data = data;
    cnst.city = city;
    // cnst.capacity = capacity;
    // cnst.soldTickets = soldTickets;
    concerts[index] = cnst;
    fs.writeFile(
      `${__dirname}/../data/database.json`,
      JSON.stringify(concerts),
      (err) => {
        res.status(200).json({
          status: 'success',
          data: {
            tour: cnst,
          },
        });
      }
    );
  }
};

// const id = req.params.id * 1;
// const data = req.body.data;
// const oras = req.body.oras;
// const capacity = req.body.capacity;
// const index = concerts.findIndex((concert) => {
//   return concert.id === id;
// });
// if (index >= 0) {
//   let cnst = concerts[index];
//   cnst.data = data;
//   cnst.oras = oras;
//   cnst.capacity = capacity;
//   fs.writeFile(
//     `${__dirname}/../data/database.json`,
//     JSON.stringify(cnst),
//     (err) => {
//       res.status(200).json({
//         status: 'success',
//       });
//     }
//   );
// }

//   "oras": "Galati", //   "data":   "", // "id": 16,
//   "Capacity": "1000000000",
//   "tickets": "2"
//   const concert = concerts.find((el) => el.id === id);
//  console.log(concert.city);
// };
exports.deleteConcert = (req, res) => {
  const id = req.params.id * 1; //ia ID-ul pe care il pasezi in route
  let forDelete = concerts.find((el) => el.id === id);
  // console.log(forDelete);
  if (forDelete) {
    var afterDelete = concerts.filter((el) => el.id !== id);
    // console.log(afterDelete);
  }
  for (let i = 0; i < afterDelete.length; i++) {
    afterDelete[i].id = i + 1;
  }
  // const realoc = realocID(afterDelete);
  // console.log(realoc);

  fs.writeFile(
    `${__dirname}/../data/database.json`,
    JSON.stringify(afterDelete),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

// [{"id":0,"data":"2021-03-11,10:00","city":"Vivo","capacity":5,"soldTickets":25},{"id":1,"data":"2021-03-11,10:00","city":"Constanta","capacity":4,"soldTickets":1},{"id":2,"data":"2021-03-11,10:00","city":"Constanta","capacity":4,"soldTickets":1},{"id":3,"data":"2021-03-11,10:00","city":"cluj","capacity":4,"soldTickets":1},{"id":4,"data":"2021-03-11,10:00","city":"cluj","capacity":4,"soldTickets":1},{"id":5,"data":"2021-03-11,10:00","city":"cluj","capacity":4,"soldTickets":1},{"id":6,"data":"2021-03-11,10:00","city":"cluj","capacity":4,"soldTickets":1},{"id":7,"data":"2021-03-11,10:00","city":"cluj","capacity":4,"soldTickets":1},{"id":8,"data":"2021-03-11,10:00","city":"cluj","capacity":4,"soldTickets":1},{"id":9,"data":"2021-03-11,10:00","city":"Deva","capacity":4,"soldTickets":1},{"id":10,"data":"2021-03-11,10:00","city":"manastur","capacity":4,"soldTickets":1},{"id":11,"data":"2021-03-11,10:00","city":"Borhanci","capacity":4,"soldTickets":1},{"id":12,"data":"2021-03-11,10:00","city":"Coviltir","capacity":4,"soldTickets":1},{"id":13,"data":"2021-03-11,10:00","city":"Vadu cRISULIU","capacity":4,"soldTickets":1},{"id":14,"data":"2021-03-11,10:00","city":"sUIOR","capacity":4,"soldTickets":1},{"id":15,"data":"2021-03-11,10:00","city":"Bye bye","capacity":4,"soldTickets":1}]
