const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const { scheduleSchema } = require("../Validations/scheduleValidation.js") 
const { validationError } = require("../Validations/errorValidation.js")
const { getSchedule, createSchedule, getOneSchedule } = require("../Queries/schedule-queries.js")
const { getUserId } = require("../Queries/login-queries.js")



// get ENTIRE SCHEDULE needs queries based on user access
router.get("/", async (req,resp) => {
    const { userId, credentials } = req.query
    const verifiedUser = await getUserId(userId)

    if(verifiedUser.id === +userId && verifiedUser.password === credentials){
        const schedule = await getSchedule(userId)
        
        schedule[0] ?
        resp.status(200).json(schedule) :
        resp.status(200).json("No schedule available")
    }
    else {
        resp.status(404).json({error: "Authorization Required"})
    }
})


// add a scheduled event
router.post("/", scheduleSchema, validationError, async (req, resp) => {
    const { userId, credentials } = req.query
    const verifiedUser = await getUserId(userId)

    if(verifiedUser.id === +userId && verifiedUser.password === credentials){
        const newSchedule  = await createSchedule(req.body)
        
        newSchedule.id ?
        resp.status(200).json(newSchedule) :
        resp.status(500).json({error: newSchedule.message})
    }
    else {
        resp.status(404).json({error: "Authorization Required"})
    }

})

// Get scheduled event(s) for ONE DAY
router.get("/:scheduleId", async (req, resp) => {
    const { userId, credentials } = req.query
    const { scheduleId } = req.params
    const verifiedUser = await getUserId(userId)

    if(verifiedUser.id === +userId && verifiedUser.password === credentials){
        const thisSchedule = await getOneSchedule(scheduleId)

        thisSchedule.id ?
        resp.status(200).json(thisSchedule) :
        resp.status(500).json({error:thisSchedule.message})
    }
    else {
        resp.status(404).json({error: "Authorization Required"})
    }
})


module.exports = router