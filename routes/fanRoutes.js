const express = require('express');
const router = express.Router();
const fanControllers = require('./../controllers/fanController');

router.route('/').get(fanControllers.getAllFans).post(fanControllers.createFan);
router
  .route('/:id')
  .get(fanControllers.getFan)
  .patch(fanControllers.updateFan)
  .delete(fanControllers.deleteFan);
module.exports = router;
