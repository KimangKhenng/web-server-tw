const { tweetModel } = require("../models/tweet.js")

const getTweetById = async (req, res) => {
    const id = req.params.id
    const tweet = await tweetModel.findById(id).populate("byUser")
    res.send(tweet)
}

module.exports = { getTweetById }