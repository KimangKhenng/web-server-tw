const asyncHandler = require('express-async-handler')
const { userModel } = require("../models/user.js")

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
    const { username, dateOfBirth, email } = req.body
    const parsedData = Date.parse(dateOfBirth)
    const newUser = new userModel({
        username,
        email,
        dateOfBirth: parsedData
    })
    const result = await newUser.save()
    res.send(result)
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
    getTweetsByUserId
}