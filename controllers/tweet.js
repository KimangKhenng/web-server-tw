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

const getAllTweets = async (req, res) => {
    const tweets = await tweetModel.find({})
    res.send(tweets)
}

module.exports = { getTweetById, getAllTweets }