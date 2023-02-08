const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()

const { getSchedule } = require("../Queries/schedule-queries.js")
const { getUser } = require("../Queries/login-queries.js")



// get needs queries based on user access
router.get("/schedule/:userId", async (req,resp) => {
    const { user, credentials } = req.query
    const { userId } = req.params
    const verifiedUser = await getUser(user)
    const validPassword = await bcrypt.compare(credentials, verifiedUser.password)

    if(verifiedUser.id === userId && validPassword){
        const schedule = await getSchedule(userId)
        
        schedule[0] ?
        resp.status(200).json(schedule) :
        resp.status(404).json("No schedule available")
    }
    else {
        resp.status(404).json({error: "Authorization Required"})
    }


})


module.exports = router