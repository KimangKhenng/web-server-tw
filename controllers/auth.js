const { signToken } = require("../common/index.js")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const axios = require("axios")
const { ifEmailExist } = require("../common/index.js")
const { userModel } = require("../models/user.js")

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

const exchangeTokenToUser = ((req, res) => {
    let token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({ error: "Access Denied!" })
    }
    token = token.replace("Bearer ", "")
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        res.status(201).json({ user: decoded })
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
})

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

const showOAuthScreen = (async (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK}&scope=profile email&response_type=code`
    res.redirect(url)
})

const handleGoogleLogin = (async (req, res) => {
    const code = req.query.code
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.GOOGLE_CALLBACK,
        grant_type: "authorization_code"
    })
    const { access_token, id_token } = data

    const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` }
    })
    const userprofile = response.data
    // Check if user exist in database
    if (await ifEmailExist(userprofile.email)) {
        const user = await userModel.findOne({ email: userprofile.email })
        const token = signToken(user)
        return res.json({ token: token })
    }
    //Register user in our database
    const newUser = new userModel({
        username: userprofile.email,
        email: userprofile.email,
        type: 'sso'
    })
    const result = await newUser.save()
    const token = signToken(result)
    return res.json({ token: token })
})

module.exports = {
    createUser,
    exchangeTokenToUser,
    loginUser,
    handleGoogleLogin,
    showOAuthScreen
}