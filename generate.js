const { faker } = require('@faker-js/faker');
const { userModel } = require('./models/user.js')
const users = 50;

const dbConnect = require("./db/db.js")

dbConnect().catch((err) => { console.log(err) })

async function generate() {
    for (let i = 0; i < users; i++) {
        let user = new userModel({
            email: faker.internet.email(),
            username: faker.internet.userName(),
            dateOfBirth: faker.date.birthdate()
        })
        const result = await user.save()
        console.log(`user: ${result._id} generated!`)
    }
}

generate()
