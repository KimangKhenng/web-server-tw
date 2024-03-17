const { userModel } = require("../models/user")
var jwt = require('jsonwebtoken')

const ifEmailExist = async (email) => {
    const user = await userModel.findOne({ email: email })
    if (user) return true
    return false
}

const signToken = (payload) => {
    const token = jwt.sign({
        id: payload.id,
        email: payload.email,
        username: payload.username
    }, process.env.JWT_KEY, {
        expiresIn: '7h',
        issuer: 'api.tfdevs.com',
        audience: 'www.tfdevs.com'
    })
    return token
}

module.exports = { ifEmailExist, signToken }