'use strict'

const service = require('../server/service')
const http = require('http')
const slackClient = require('../server/slackClient')
const chalk = require('chalk')
const slackToken = process.env.SLACK_TOKEN

const server = http.createServer(service)
const rtm = slackClient.init(slackToken)
rtm.start()

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000))

server.on('listening', () => {
    console.log(chalk.green(`🚀 Server is listening on port ${server.address().port} in ${service.get('env')} mode `))
})
