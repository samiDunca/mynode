const Fan = require('./../models/fanModel');

exports.getAllFans = async (req, res) => {
  try {
    const fans = await Fan.find();

    res.status(200).json({
      status: 'success',
      data: {
        fans,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createFan = async (req, res) => {
  try {
    const newFan = await Fan.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newFan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getFan = async (req, res) => {
  try {
    const fan = await Fan.findOne({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        fan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateFan = async (req, res) => {
  try {
    const fan = await Fan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        fan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteFan = async (req, res) => {
  try {
    await Fan.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'succcess',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
