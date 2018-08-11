'use strict'

const { RTMClient } = require('@slack/client')

module.exports.init = function slackClient (token) {
    const rtm = new RTMClient(token)
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