const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ message: err.message });
};
class BaseError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

class DatabaseError extends BaseError {
  constructor(message) {
    super(message);
    this.code = 'DATABASE_ERROR';
    this.statusCode = 500;
  }
}

module.exports = { catchAsync, BaseError, globalErrorHandler, DatabaseError };
