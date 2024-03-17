const asyncHandler = require('express-async-handler')
const { userModel } = require("../models/user.js")
const { signToken } = require("../common/index.js")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken')

const getAllUsers = (asyncHandler(async (req, res) => {
    const users = await userModel.find({})
    res.send(users)
}))

const getTweetsByUserId = (asyncHandler(async (req, res) => {
    const id = req.params.userId
    const users = await userModel.findById(id).populate('tweets').exec()
    res.send(users)
}))

const getUserById = (async (req, res) => {
    const id = req.params.userId
    const user = await userModel.findById(id)
    res.send(user)
})

const createUser = (asyncHandler(async (req, res) => {
    const { username, dateOfBirth, email, password } = req.body
    const parsedData = Date.parse(dateOfBirth)
    const hashedPassword = await bcrypt.hash(password, 15)
    const newUser = new userModel({
        username,
        email,
        dateOfBirth: parsedData,
        password: hashedPassword
    })
    let result = await newUser.save()

    const token = signToken(result)

    res.json({ token: token })
}))

const loginUser = (asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({
        email: email
    })
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
        return res.status(401).json({ error: "Password or email incorrect!" })
    }
    const token = signToken(user)

    return res.json({ token: token })
}))

const deleteUser = (async (req, res) => {
    const id = req.params.userId
    const result = await userModel.findByIdAndDelete(id)
    res.send(result)
})

const updateUser = (async (req, res) => {
    const id = req.params.userId
    const updated = await userModel.findByIdAndUpdate(id, req.body, {
        new: true
    })
    res.send(updated)
})

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    getTweetsByUserId,
    loginUser
}