
const getAllUsers = ((req, res) => {
    res.send("All users")
})

const getUserById = ((req, res) => {
    res.send("User Id: " + req.params.userId)
})

const createUser = ((req, res) => {
    res.send("User created")
})

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