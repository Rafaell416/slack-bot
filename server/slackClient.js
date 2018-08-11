'use strict'

const { RTMClient, LogLevel } = require('@slack/client')
const chalk = require('chalk')
const { handleError } = require('../utilities')

function handleOnAuthenticated (rtmStartData) {
    console.log(chalk.green(`[slack-bot] Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`))
}

function addAuthenticatedHandler (rtm, handler) {
    rtm.on('authenticated', handler)
}

function handleOnMessage (message, rtm, nlp) {
    nlp.ask(message.text, (err, res) => {
      if (err) {
        handleError(err, 'There was an error handling on message')
        return
      }

      if (!res.intent) {
        return rtm.sendMessage('No te entiendo un carajo, habla claro.', message.channel)
        .then((res) => console.log('Message sent 👌'))
        .catch((err) => handleError(err, 'There was an error seding message back'))
      }

      else if ( res.intent[0].value == 'time' && res.location ) {
        return rtm.sendMessage(`I don't yet know the time in ${res.location[0].value}`, message.channel)
        .then((res) => console.log('Message sent 👌'))
        .catch((err) => handleError(err, 'There was an error seding message back'))
      }

      else {
        console.log('unidentified intent', res)
        return rtm.sendMessage('No te entiendo un carajo, habla claro.', message.channel)
        .then((res) => console.log('Message sent 👌'))
        .catch((err) => handleError(err, 'There was an error seding message back'))
      }
    })
}

module.exports.init = function slackClient (token, nlp) {
    const rtm = new RTMClient(token)//{logLevel: LogLevel.VERBOSE}
    addAuthenticatedHandler(rtm, handleOnAuthenticated)
    rtm.on('message', (message) => handleOnMessage(message, rtm, nlp))
    return rtm
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler
