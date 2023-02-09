const express = require("express")
const router = express.Router()
const { scheduleSchema, scheduleUserCheck } = require("../Validations/scheduleValidation.js") 
const { validationError } = require("../Validations/errorValidation.js")
const { getSchedule, createSchedule, getOneSchedule, deleteSchedule } = require("../Queries/schedule-queries.js")

router.use(scheduleUserCheck)

// get ENTIRE SCHEDULE needs queries based on user access
router.get("/", async (req,resp) => {
    const { userId } = req.query
    const schedule = await getSchedule(userId)
        
    schedule[0] ?
    resp.status(200).json(schedule) :
    resp.status(200).json("No schedule available")
})

// CREATE SCHEDULED EVENT
router.post("/", scheduleSchema, validationError, async (req, resp) => {
   const newSchedule  = await createSchedule(req.body)
        
   newSchedule.id ?
   resp.status(200).json(newSchedule) :
   resp.status(500).json({error: newSchedule.message})
})

// GET ONE SCHEDULED EVENT
router.get("/:scheduleId", async (req, resp) => {
    const { scheduleId } = req.params
    const thisSchedule = await getOneSchedule(scheduleId)
    
    thisSchedule.id ?
    resp.status(200).json(thisSchedule) :
    resp.status(500).json({error:thisSchedule.message})
})

// DELETED SCHEDULED EVENT
router.delete("/:scheduleId", async (req, resp) => {
    const { scheduleId } = req.params
    const deletedEvent = await deleteSchedule(scheduleId)
    
    deletedEvent.id ?
    resp.status(200).json(deletedEvent) :
    resp.status(500).json({error : deletedEvent.message})
})


module.exports = router