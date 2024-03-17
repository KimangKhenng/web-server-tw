const express = require('express')
const authRoute = express.Router()
const { createUser, loginUser, exchangeTokenToUser, handleGoogleLogin, showOAuthScreen } = require("../controllers/auth.js")

const { createUserValidator, loginUserValidator } = require("../validators/index.js")
const { handleValidation } = require("../middlewares/index.js")

authRoute.post('/register', createUserValidator, handleValidation, createUser)
authRoute.post('/login', loginUserValidator, handleValidation, loginUser)
authRoute.get('/me', exchangeTokenToUser)
authRoute.get('/google', showOAuthScreen)
authRoute.get('/google/callback', handleGoogleLogin)

module.exports = authRoute