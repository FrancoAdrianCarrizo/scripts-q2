const winston = require("winston");
const { format, transports } = winston;
const path = require("path");

const logFormat = format.printf(
  (info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
);

let alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: "[LOGGER]",
  }),
  winston.format.timestamp({
    format: "YY-MM-DD HH:mm:ss",
  }),
  winston.format.printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    // Format the metadata object
    format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.prettyPrint(),
        format.splat(),
        format.printf((info) => {
          if (typeof info.message === "object") {
            info.message = JSON.stringify(info.message, null, 3);
          }

          return info.message;
        }),
        alignColorsAndTime,
        logFormat
      ),
    }),
    new transports.File({
      filename: "logs/combined.log",
      format: format.combine(
        format.prettyPrint(),
        format.splat(),
        format.printf((info) => {
          if (typeof info.message === "object") {
            info.message = JSON.stringify(info.message, null, 3);
          }

          return info.message;
        }),
        format.json()
      ),
    }),
  ],
  exitOnError: false,
});
module.exports = logger;
