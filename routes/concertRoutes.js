const express = require('express');
const router = express.Router();
const concertControllers = require('./../controllers/concertController');

// router.param('id', concertControllers.checkID);

router
  .route('/')
  .get(concertControllers.getAllConcerts)
  .post(concertControllers.createConcert);

router
  .route('/:id')
  .get(concertControllers.getConcert)
  .put(concertControllers.updateConcert)
  .delete(concertControllers.deleteConcert);

module.exports = router;
