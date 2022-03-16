const Member = require('./../models/memberModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllMembers = catchAsync(async (req, res, next) => {
  const members = await Member.find();

  res.status(200).json({
    status: 'success',
    data: {
      members,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }

  // 2) Update user document
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updateMember = await Member.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: 'success',
    data: {
      user: updateMember,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Member.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createMember = catchAsync(async (req, res, next) => {
  const newMember = await Member.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      member: newMember,
    },
  });
});

exports.getMember = catchAsync(async (req, res, next) => {
  const member = await Member.findOne({ _id: req.params.id });

  if (!member) {
    return next(new AppError('No member found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      member,
    },
  });
});

exports.updateMember = catchAsync(async (req, res, next) => {
  const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!member) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      member,
    },
  });
});

exports.deleteMember = catchAsync(async (req, res, next) => {
  const member = await Member.findByIdAndDelete(req.params.id);

  if (!member) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
