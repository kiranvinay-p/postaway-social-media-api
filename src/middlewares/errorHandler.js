export const errorHandler = (error, req, res, next) => {
  console.error(error);

  const statusCode = error.statusCode || 500;

  const message = error.statusCode
    ? error.message
    : "Oops! Something went wrong... Please try again later.";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
