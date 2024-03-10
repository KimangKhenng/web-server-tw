const express = require('express')
const tweetRoute = express.Router()
const { getTweetById } = require("../controllers/tweet.js")

tweetRoute.get('/', (req, res) => {
    res.send('Hello World 2!')
})

tweetRoute.get('/:id', getTweetById)

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

