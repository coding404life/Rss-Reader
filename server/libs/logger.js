/* eslint-disable no-empty-function */
// Create a logging instance

const Logger = require('signale')

const loggerOptions = {
  config: {
    displayDate: true,
    displayTimestamp: true,
    displayBadge: false,
    displayScope: false,
    displayFilename: true
  },
  types: {
    error: {
      stream: process.stderr
    }
  }
}

const logger = new Logger.Signale(loggerOptions)

// silence debug logs
logger.debug = () => {}
logger.spreadError = (e) => {
  return [e.message, e.body, e.text, e.response?.body, e.cause, e.stack].filter(Boolean)
}

module.exports = logger
