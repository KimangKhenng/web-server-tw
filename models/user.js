const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: Date,
    password: String,
    followers: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    followings: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    tweets: [{ type: mongoose.Types.ObjectId, ref: 'tweets' }],
    type: {
        type: String,
        enum: ['common', 'sso'],
        default: 'common'
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = { userSchema, userModel }