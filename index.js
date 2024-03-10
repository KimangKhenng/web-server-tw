const express = require('express')
const userRouter = require("./routes/user.js")
const tweetRoute = require("./routes/tweet.js")
const dbConnect = require("./db/db.js")
const app = express()
const port = 3000
// const bodyParser = require('body-parser')

dbConnect().catch((err) => { console.log(err) })

// app.use(bodyParser.json())
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/tweets', tweetRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})