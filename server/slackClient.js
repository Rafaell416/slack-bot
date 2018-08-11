'use strict'

const { RTMClient, LogLevel } = require('@slack/client')
const chalk = require('chalk')

function handleOnAuthenticated (rtmStartData) {
    console.log(chalk.green(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`))
}

function addAuthenticatedHandler (rtm, handler) {
    rtm.on('authenticated', handler)
}

module.exports.init = function slackClient (token) {
    const rtm = new RTMClient(token, {logLevel: LogLevel.DEBUG})
    addAuthenticatedHandler(rtm, handleOnAuthenticated)
    return rtm
}


/*

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C1232456'

// The RTM client can send simple string messages
rtm.sendMessage('Hello there', conversationId)
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts)
  })
  .catch(err => console.error('There was an error ==>', err))

  */