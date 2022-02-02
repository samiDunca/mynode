const Concert = require('./../models/concertModel');

exports.getAllConcerts = async (req, res) => {
  try {
    const concerts = await Concert.find();

    res.status(200).json({
      status: 'success',
      data: {
        concerts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createConcert = async (req, res) => {
  try {
    const newConcert = await Concert.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newConcert,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getConcert = async (req, res) => {
  try {
    const concert = await Concert.findOne({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        concert,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateConcert = async (req, res) => {
  try {
    const concert = await Concert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        concert,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    await Concert.findByIdAndDelete(req.params.id);
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
