const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
// database query functions
const { createUser, userExist, deleteUser } = require("../Queries/register-queries.js")
// validation functions
const {  registrationSchema } = require("../Validations/registerValidation.js")
const { validationError } = require("../Validations/errorValidation.js")

// router.use(validateRequest, registrationSchema, validationError)

router.get("/", (req, resp) => {
    resp.send("register")
})

router.post("/", registrationSchema, validationError, async (req, resp) => {
    const { userName, password } = req.body
    const exist = await userExist(userName)
    if(exist){
        resp.status(400).json("UserName is not available")
    }
    else{
        const hash = await bcrypt.hash(password, 5);
        const newUser = await createUser({
        userName : userName,
        password : hash,
        admin_access : true
    })
        newUser.id ?  
        resp.status(200).json({
        Status: "Success your account has been created",
        userName: newUser.userName,
        token: newUser.password,
        id: newUser.id
        }) :
        resp.status(500).json({error: newUser.message})
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