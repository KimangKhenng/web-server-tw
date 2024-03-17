const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require("passport")

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
    issuer: 'api.tfdevs.com',
    audience: 'www.tfdevs.com'
}

const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload)
    done(null, jwt_payload)
})

module.exports = { jwtStrategy }



