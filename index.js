const express = require('express')
const userRouter = require("./routes/user.js")
const tweetRoute = require("./routes/tweet.js")
const app = express()
const port = 3000

app.use('/api/users', userRouter)
app.use('/api/tweets', tweetRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})