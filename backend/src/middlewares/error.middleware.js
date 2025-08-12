// This middleware handles requests to routes that don't exist.
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next middleware (our error handler)
};

// This is our main error handling middleware. It catches all errors passed by `next(error)`.
const errorHandler = (err, req, res, next) => {
  // Sometimes an error might occur but the status code is still 200.
  // In that case, we set it to 500 (Internal Server Error).
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // We only want the stack trace in development mode for debugging.
    // In production, this should be null for security reasons.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };