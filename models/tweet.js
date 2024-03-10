const mongoose = require("mongoose")

const Schema = mongoose.Schema

const tweetSchema = new Schema({
    text: { type: String, required: true },
    byUser: { type: mongoose.Types.ObjectId, ref: 'users' },
    createdDate: { type: Date, required: true }
})

const tweetModel = mongoose.model("tweets", tweetSchema)

module.exports = { tweetSchema, tweetModel }