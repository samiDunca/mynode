const { promisify } = require('util');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Member = require('./../models/memberModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (member, statusCode, res) => {
  const token = signToken(member._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      member,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newMember = await Member.create({
    email: req.body.email,
    name: req.body.name,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newMember, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body; //object distructioring, it's like: req.body.email/password

  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if member exists && password is correct
  const member = await Member.findOne({ email }).select('+password');

  if (!member || !(await member.correctPassword(password, member.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everithing ok, send token to client
  createSendToken(member, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Veerificam token/ verificam daca cnv a manipulat data sau daca a expirat
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // 3) check if user still exists
  const currentUser = await Member.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.member = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.member.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const member = await Member.findOne({ email: req.body.email });
  if (!member) {
    return next(new AppError('There is no user with email address.', 404));
  }
  // 2) Generate the random reset token
  const resetToken = member.createPasswordResetToken();
  await member.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const redirectToWebsite = `http://localhost:3001/reset-password/${resetToken}`;
  const message =
    `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email! \n` +
    redirectToWebsite;

  try {
    await sendEmail({
      email: member.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    member.passwordResetToken = undefined;
    member.passwordResetExpires = undefined;
    await member.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const member = await Member.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there isi user, set the new password
  if (!member) {
    return next(new AppError('Token is invalid or has expired.', 400));
  }
  member.password = req.body.password;
  member.passwordConfirm = req.body.passwordConfirm;
  member.passwordResetToken = undefined;
  member.passwordResetExpires = undefined;
  await member.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  // const token = signToken(user._id);

  createSendToken(member, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const member = await Member.findById(req.member.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (
    !(await member.correctPassword(req.body.passwordCurrent, member.password))
  ) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  member.password = req.body.password;
  member.passwordConfirm = req.body.passwordConfirm;
  await member.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(member, 200, res);
});
