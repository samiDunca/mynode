const express = require('express');
const router = express.Router();
const concertController = require('./../controllers/concertController');
const authController = require('./../controllers/authController');

// router.param('id', concertController.checkID);

router
  .route('/')
  .get(authController.protect, concertController.getAllConcerts)
  .get(concertController.getAllConcerts)
  .post(concertController.createConcert);

router
  .route('/:id')
  .get(concertController.getConcert)
  .put(concertController.updateConcert)
  .delete(concertController.deleteConcert);
// .delete(
//   authController.protect,
//   authController.restrictTo('admin', 'lead-guide'),
//   concertController.deleteConcert
// );

module.exports = router;
