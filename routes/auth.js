const express = require('express')
const authRoute = express.Router()
const { createUser, loginUser } = require("../controllers/user.js")

const { createUserValidator, loginUserValidator } = require("../validators/index.js")
const { handleValidation } = require("../middlewares/index.js")

authRoute.post('/register', createUserValidator, handleValidation, createUser)
authRoute.post('/login', loginUserValidator, handleValidation, loginUser)

module.exports = authRoute