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

module.exports = {
    handleRequest, authMiddleware
}