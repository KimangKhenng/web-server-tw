const { tweetModel } = require("../models/tweet.js")

const getTweetById = async (req, res) => {
    const id = req.params.id
    let tweet
    try {
        tweet = await tweetModel.findById(id)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: 'Not found' })
    }
    res.send(tweet)
}

const createTweet = async (req, res) => {
    const { text } = req.body
    console.log(req.user)
    const newTweet = new tweetModel({
        text: text,
        byUser: req.user.id,
        createdDate: Date.now()
    })
    const result = await newTweet.save()
    res.send(result)
}

const getAllTweets = async (req, res) => {
    const tweets = await tweetModel.find({})
    res.send(tweets)
}

module.exports = { getTweetById, getAllTweets, createTweet }