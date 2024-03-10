const express = require('express')
const userRouter = express.Router()
const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser } =
    require("../controllers/user.js")

const { body } = require("express-validator")

userRouter.get('/', getAllUsers)

userRouter.get('/:userId', getUserById)

userRouter.post('/', body('email').trim().isEmail(), createUser)

userRouter.delete('/:userId', deleteUser)

userRouter.put('/:userId', updateUser)

module.exports = userRouter

