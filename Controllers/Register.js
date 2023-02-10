const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
// database query functions
const { createUser, userExist, deleteUser } = require("../Queries/register-queries.js")
// generate jwt
const { generateAccessToken } = require("../Validations/loginValidation.js")
// validation functions
const {  registrationSchema } = require("../Validations/registerValidation.js")
const { validationError } = require("../Validations/errorValidation.js")

router.get("/", (req, resp) => {
    resp.send("register")
})

router.post("/", registrationSchema, validationError, async (req, resp) => {
    const { userName, password } = req.body
    const exist = await userExist(userName)
    
    if(!exist.username){
        const hash = await bcrypt.hash(password, 10)
        const newUser = await createUser({
        userName : userName,
        password : hash
    })
        if(newUser.id){
            const token = generateAccessToken(newUser.username)

            resp.status(200).json({
                message: "Account Created",
                userName: newUser.username,
                userId : newUser.id,
                jwt: token
                })
        }
        else{
            resp.status(500).json({error: newUser.message})
        }
    }
    else{
        resp.status(400).json("UserName is not available")
    }
})

// delete user
router.delete("/:id", async (req, resp) => {
    const { id } = req.params
    const deletedUser = await deleteUser(id)

    deletedUser.id ?
    resp.status(200).json("Account Deleted") :
    resp.status(404).json("User Not Found")
})



module.exports = router