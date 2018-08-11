'use strict'
const chalk = require('chalk')

function handleError (err, message) {
  console.log(chalk.red(`[ERROR] ${message} ==> ${err}`))
}

module.exports = {
  handleError
}
