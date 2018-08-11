'use strict'

const { RTMClient, LogLevel } = require('@slack/client')
const chalk = require('chalk')

function handleOnAuthenticated (rtmStartData) {
    console.log(chalk.green(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`))
}

function addAuthenticatedHandler (rtm, handler) {
    rtm.on('authenticated', handler)
}

function handleOnMessage (message, rtm) {
    console.log(chalk.cyan(`(channel:${message.channel}) ${message.user} says: ${message.text}`))

    rtm.sendMessage('Habla que?', message.channel)
    .then((res) => console.log('Message sent 👌'))
    .catch((err) => handleError)
}

function handleError (err) {
    console.log(chalk.red(`[error] ${err}`))
}

module.exports.init = function slackClient (token) {
    const rtm = new RTMClient(token)//{logLevel: LogLevel.VERBOSE}
    addAuthenticatedHandler(rtm, handleOnAuthenticated)
    rtm.on('message', (message) => handleOnMessage(message, rtm))
    return rtm
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler