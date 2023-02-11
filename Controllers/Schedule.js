const express = require("express")
// merge params with calendar
const router = express.Router({mergeParams: true})
const { scheduleSchema, verifyToken } = require("../Validations/scheduleValidation.js") 
const { validationError } = require("../Validations/errorValidation.js")
const { getSchedule, createSchedule, getOneSchedule, deleteSchedule, updateSchedule } = require("../Queries/schedule-queries.js")

router.use(verifyToken)

// get ENTIRE SCHEDULE uses jwt verification for user acces based on user access OR GET SCHEDULE BY DATE (calendar merge params)
router.get("/", async (req,resp) => {
    const { date } = req.params 
    const { userId } = req.query
    
    if(date){
        const schedule = await getSchedule(userId, date)
        schedule[0] ?
        resp.status(200).json(schedule) :
        resp.status(400).json("nothing from database")
    }
    else {
        const allSchedule = await getSchedule(userId)
        console.log(allSchedule)
        allSchedule[0] ?
        resp.status(200).json(allSchedule) :
        resp.status(400).json("no data right condtional")
    }      
})

// CREATE SCHEDULED EVENT
router.post("/", scheduleSchema, validationError, async (req, resp) => {
    const { date } = req.params
    if(!date){
        const newSchedule  = await createSchedule(req.body)
        
        newSchedule.id ?
        resp.status(200).json(newSchedule) :
        resp.status(500).json({error: newSchedule.message})
    }
    else {
        resp.status(404). json({error: "Cannot post to this url"})
    }
})

// GET ONE SCHEDULED EVENT
router.get("/:scheduleId", async (req, resp) => {
    const { scheduleId, date } = req.params

    if(!date){
        const thisSchedule = await getOneSchedule(scheduleId)
    
        thisSchedule.id ?
        resp.status(200).json(thisSchedule) :
        resp.status(500).json({error:thisSchedule.message})
    }
    else {
        resp.status(404).json({error: "Invalid URL path"})
    }
    
})

// DELETE SCHEDULED EVENT
router.delete("/:scheduleId", async (req, resp) => {
    const { scheduleId, data } = req.params
    if(!data){
        const deletedEvent = await deleteSchedule(scheduleId)
    
        deletedEvent.id ?
        resp.status(200).json(deletedEvent) :
        resp.status(500).json({error : deletedEvent.message})
    }
    else {
        resp.status(404).json({error: "Invalid URL Path"})
    }   
})

// UPDATE SCHEDULED EVENT
router.put("/:scheduleId", scheduleSchema, validationError, async (req, resp) => {
    const { scheduleId, data } = req.params
    if(!data){
        const updatedEvent = await updateSchedule(scheduleId, req.body)

        updatedEvent.id ?
        resp.status(200).json(updatedEvent) :
        resp.status(500).json({error: updatedEvent.message})
    }
    else {
        resp.status(404).json({error: "Ivalid URL path"})
    }  
})


module.exports = router