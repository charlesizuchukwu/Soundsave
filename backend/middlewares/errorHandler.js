async function errorHandler(req, res, err, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;

  return res.status(statusCode).json({ error: err });
  // next(err);
}

module.exports = errorHandler;
