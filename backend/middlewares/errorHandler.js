export default async function errorHandler(req, res, err, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({ error: err });
}
