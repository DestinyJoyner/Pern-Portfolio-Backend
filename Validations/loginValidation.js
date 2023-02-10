const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const { body } = require("express-validator")

const loginSchema = [
    body('userName').exists({checkFalsy: true}).isString({max: 15}),
    body('password').exists({checkFalsy: true}).isLength({min: 5}),
]

function generateAccessToken(string) {
    return jwt.sign({username: string}, process.env.SECRET_TOKEN, {expiresIn: '24h' } );
  }


module.exports = {
    loginSchema,
    generateAccessToken,
}