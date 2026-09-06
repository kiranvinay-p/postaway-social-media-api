import winston from "winston";

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, message }) => {
      return `${timestamp} ${message}`;
    }),
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "application.log",
    }),
  ],
});

export const loggerMiddleware = (req, res, next) => {
  logger.info(
    `req URL: ${req.originalUrl} | reqBody: ${JSON.stringify(req.body)}`,
  );

  next();
};

export default logger;
