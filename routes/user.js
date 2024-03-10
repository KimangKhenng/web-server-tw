const express = require('express')
const userRouter = express.Router()
const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser } =
    require("../controllers/user.js")



userRouter.get('/', getAllUsers)

userRouter.get('/:userId', getUserById)

userRouter.post('/', createUser)

userRouter.delete('/:userId', deleteUser)

userRouter.put('/:userId', updateUser)

module.exports = userRouter

