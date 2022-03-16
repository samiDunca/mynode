//ES6 class sintax
//AppError inherits propertys from Error
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //call the parrent class

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
