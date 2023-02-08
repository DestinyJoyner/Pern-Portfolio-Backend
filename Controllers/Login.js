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
        validPassword ? 
        resp.status(200).json({
            token: validPassword,
            id : verifiedUser.id
        }) :
        resp.status(404).json(validPassword)
    }
    else {
        resp.status(404).json("User not found")
    }
})



module.exports = router