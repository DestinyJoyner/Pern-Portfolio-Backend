const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const { getUser } = require("../Queries/login-queries.js")
const { loginSchema } = require("../Validations/loginValidation.js")
const { validationError } = require("../Validations/errorValidation.js")

router.get("/", (req, resp) => {
    resp.json({token: "test123"})
})

router.post("/", loginSchema, validationError, async (req, resp) => {
    const {userName, password } = req.body
    const verifiedUser = await getUser(userName)

    if(verifiedUser.id){
        // now authenticate password
        const validPassword = await bcrypt.compare(password, verifiedUser.password)
        console.log(verifiedUser)
        validPassword ? 
        resp.status(200).json({
            userName: verifiedUser.username,
            token: verifiedUser.password,
            id : verifiedUser.id
        }) :
        resp.status(404).json("Invalid Password")
    }
    else {
        resp.status(404).json("User not found")
    }
})



module.exports = router