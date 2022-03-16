const Fan = require('./../models/fanModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllFans = catchAsync(async (req, res, next) => {
  const fans = await Fan.find();

  res.status(200).json({
    status: 'success',
    data: {
      fans,
    },
  });
});

exports.createFan = catchAsync(async (req, res, next) => {
  const newFan = await Fan.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newFan,
    },
  });
});

exports.getFan = catchAsync(async (req, res, next) => {
  const fan = await Fan.findOne({ _id: req.params.id });

  if (!fan) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      fan,
    },
  });
});

exports.updateFan = catchAsync(async (req, res, next) => {
  const fan = await Fan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!fan) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      fan,
    },
  });
});

exports.deleteFan = catchAsync(async (req, res, next) => {
  const fan = await Fan.findByIdAndDelete(req.params.id);

  if (!fan) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(204).json({
    status: 'succcess',
    data: null,
  });
});
