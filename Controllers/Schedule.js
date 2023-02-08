const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const { scheduleSchema } = require("../Validations/scheduleValidation.js") 
const { validationError } = require("../Validations/errorValidation.js")
const { getSchedule, createSchedule, } = require("../Queries/schedule-queries.js")
const { getUser } = require("../Queries/login-queries.js")



// get needs queries based on user access
router.get("/:userId", async (req,resp) => {
    const { user, credentials } = req.query
    const { userId } = req.params
    const verifiedUser = await getUser(user)

    if(verifiedUser.id === +userId && verifiedUser.password === credentials){
        const schedule = await getSchedule(userId)
        
        schedule[0] ?
        resp.status(200).json(schedule) :
        resp.status(404).json("No schedule available")
    }
    else {
        resp.status(404).json({error: "Authorization Required"})
    }
})

// add a scheduled event
router.post("/:userId", scheduleSchema, validationError, async (req, resp) => {
    const { user, credentials } = req.query
    const { userId } = req.params
    const verifiedUser = await getUser(user)

    if(verifiedUser.id === +userId && verifiedUser.password === credentials){
        const newSchedule  = await createSchedule(req.body)
        
        newSchedule.id ?
        resp.status(200).json(newSchedule) :
        resp.status(404).json({error: newSchedule.message})
    }
    else {
        resp.status(404).json({error: "Authorization Required"})
    }

})


module.exports = router