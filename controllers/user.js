const { users } = require("../data/users.js")
const asyncHandler = require('express-async-handler')

const getAllUsers = (asyncHandler(async (req, res) => {
    res.send(users)
}))

const getUserById = ((req, res) => {
    const id = req.params.userId
    const user = users.filter(item => {
        return item.id == id
    })
    res.send(user)
})

const createUser = (asyncHandler((req, res) => {
    const { id, name, age, email } = req.body
    const newUser = {
        id,
        name,
        age,
        email
    }
    if (users.some(item => {
        return item.email == email
    })) {
        throw new Error("Duplicated User")
    }
    users.push(newUser)
    res.send(newUser)
}))

const deleteUser = ((req, res) => {
    res.send("User deleted")
})

const updateUser = ((req, res) => {
    res.send("User updated")
})

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}