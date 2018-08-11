'use strict'

const request = require('superagent')
const WIT_ENDPOINT = process.env.WIT_ENDPOINT
const chalk = require('chalk')

function handleWitResponse (res) {
  return res.entities
}

module.exports = function witClient (token) {
  const ask = function ask (message, cb) {
    request
      .get(WIT_ENDPOINT)
      .set('Authorization', 'Bearer ' + token)
      .query({ v: '20180811' })
      .query({ q: message })
      .end((err, res) => {
        if (err) return cb(err)

        if (res.statusCode !== 200) return cb(`Expected status code 200 but got ${res.statusCode} `)

        return cb(null, res.body.entities)
      })
  }

  return {
    ask
  }
}
