const Concert = require('./../models/concertModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllConcerts = catchAsync(async (req, res, next) => {
  const concerts = await Concert.find();

  res.status(200).json({
    status: 'success',
    data: {
      concerts,
    },
  });
});

exports.createConcert = catchAsync(async (req, res, next) => {
  const newConcert = await Concert.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newConcert,
    },
  });
});

exports.getConcert = catchAsync(async (req, res, next) => {
  const concert = await Concert.findOne({ _id: req.params.id });

  if (!concert) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      concert,
    },
  });
});

exports.updateConcert = catchAsync(async (req, res, next) => {
  const concert = await Concert.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!concert) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      concert,
    },
  });
});

exports.deleteConcert = catchAsync(async (req, res, next) => {
  const concert = await Concert.findByIdAndDelete(req.params.id);

  if (!concert) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(204).json({
    status: 'succcess',
    data: null,
  });
});
