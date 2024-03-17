const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')

function handleRequest(req, res, next) {
    // Checking logic in req
    const error = false
    if (error) {
        res.status(500).send("Error!")
    }
    next()
}

function authMiddleware(req, res, next) {
    //Checking logic in req
    const error = false
    if (error) {
        res.status(500).send("Error Auth!")
    }
    next()
}

function handleValidation(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        next()
    } else {
        res.send({ errors: result.array() })
    }

}

function validateToken(req, res, next) {
    let token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({ error: "Access Denied!" })
    }
    token = token.replace("Bearer ", "")
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

module.exports = {
    handleRequest, authMiddleware, handleValidation, validateToken
}