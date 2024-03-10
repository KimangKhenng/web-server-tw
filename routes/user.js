const express = require('express')
const userRouter = express.Router()
const {
    getAllUsers,
    getUserById,
    getTweetsByUserId,
    createUser,
    deleteUser,
    updateUser } =
    require("../controllers/user.js")

const { createUserValidator } = require("../validators/index.js")
const { handleValidation } = require("../middlewares/index.js")

userRouter.get('/', getAllUsers)

userRouter.get('/:userId', getUserById)

userRouter.get('/:userId/tweets', getTweetsByUserId)

userRouter.post('/', createUserValidator, handleValidation, createUser)

userRouter.delete('/:userId', deleteUser)

userRouter.put('/:userId', updateUser)

module.exports = userRouter

