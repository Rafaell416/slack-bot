'use strict'

const service = require('../server/service')
const http = require('http')
const slackClient = require('../server/slackClient')
const witClient = require('../server/witClient')
const chalk = require('chalk')

const witToken = process.env.WIT_TOKEN
const slackToken = process.env.SLACK_TOKEN


const nlp = witClient(witToken)

const server = http.createServer(service)
const rtm = slackClient.init(slackToken, nlp)
rtm.start()

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000))

server.on('listening', () => {
    console.log(chalk.green(`[slack-bot] 🚀 Server is listening on port ${server.address().port} in ${service.get('env')} mode `))
})
