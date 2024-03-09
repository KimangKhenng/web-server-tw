const express = require('express')
const tweetRoute = express.Router()

tweetRoute.get('/', (req, res) => {
    res.send('Hello World 2!')
})

tweetRoute.post('/', (req, res) => {
    res.send('Hello World 2!')
})

tweetRoute.delete('/:userId', (req, res) => {
    res.send('Hello World 2!')
})

tweetRoute.put('/:userId', (req, res) => {
    res.send('Hello World 2!')
})

module.exports = tweetRoute

