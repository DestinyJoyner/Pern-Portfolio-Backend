const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const dotenv = require("dotenv")
dotenv.config()
const { getUser } = require("../Queries/login-queries.js")
const { loginSchema } = require("../Validations/loginValidation.js")
const { validationError } = require("../Validations/errorValidation.js")

// json web token testing
const jwt = require("jsonwebtoken")
function generateAccessToken(string) {
    return jwt.sign({username: string}, process.env.SECRET_TOKEN, {expiresIn: '1h' } );
  }

// add login verification to generate token 
router.get("/", (req, resp) => {
    resp.json("Please Create an acount at :")
})

router.post("/", loginSchema, validationError, async (req, resp) => {
    const {userName, password } = req.body
    const verifiedUser = await getUser(userName)

    if(verifiedUser.id){
        // now authenticate password
        const validPassword = await bcrypt.compare(password, verifiedUser.password)
        if(validPassword){
            const token = generateAccessToken(verifiedUser.username)
            req.token = token
            resp.status(200).json({
                message: "Login success",
                userName: verifiedUser.username,
                userId : verifiedUser.id,
                JWT: token
            })
        }
        else {
            resp.status(404).json("Invalid Password")
        }
    }
    else {
        resp.status(404).json("User not found")
    }
})



module.exports = router