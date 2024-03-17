const { checkSchema } = require("express-validator")
const { ifEmailExist } = require("../common/index.js")

const createUserValidator = checkSchema({
    email: {
        isEmail: true,
        trim: true,
        custom: {
            options: async (value) => {
                const exist = await ifEmailExist(value)
                if (exist) throw new Error("Email already registered!")
            }
        }
    },
    username: {
        notEmpty: true,
        isLength: {
            options: {
                max: 10,
            },
            errorMessage: 'Only max 10 characters allowed'
        },
        trim: true
    },
    password: {
        isLength: {
            options: {
                max: 30,
                min: 6,
            },
            errorMessage: "Password length must be between 30 and 6 characters!"
        }
    },
    confirmedPassword: {
        custom: {
            options: async (value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("Password Mismatched!")
                }
            }
        }
    }
})

const loginUserValidator = checkSchema({
    email: {
        isEmail: true,
        trim: true,
        custom: {
            options: async (value) => {
                const exist = await ifEmailExist(value)
                if (!exist) throw new Error("Email not registered!")
            }
        }
    },
    password: {
        isLength: {
            options: {
                max: 30,
                min: 6,
            },
            errorMessage: "Password length must be between 30 and 6 characters!"
        }
    }
})

module.exports = { createUserValidator, loginUserValidator }