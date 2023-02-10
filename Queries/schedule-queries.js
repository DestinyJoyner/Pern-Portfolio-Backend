const database = require("../database/databaseConfig.js")
// 
async function getSchedule (userIdValue){
    // if(dateValue){
    //     try {
    //         const eventsForDate = await database.any('SELECT * FROM schedules WHERE day_start =$1 AND user_id = $2', 
    //         [
    //             dateValue,
    //             userIdValue
    //         ])
    //         return eventsForDate 
    //     } 
    //     catch (error) {
    //         return error
    //     }
    // }
    // else{
        try {
            const userSchedule = await database.any('SELECT * FROM schedules WHERE user_id=$1', userIdValue)
            return userSchedule
        } 
        catch (error) {
            return error   
        }
    // }
    
}

// function new scheduled event
async function createSchedule(obj){
    try {
        const newSchedule = database.one(
            'INSERT INTO schedules(day_start, day_end, title, description, important, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [
                obj.day_start,
                obj.day_end,
                obj.title, 
                obj.description,
                obj.important,
                obj.user_id
            ]
        )
        return newSchedule
        
    } 
    catch (error) {
        return error
    }
}

// function get ONE event from schedule
async function getOneSchedule (idValue) {
    try {
        const oneSchedule = await database.one(
            'SELECT * FROM schedules INNER JOIN calendar ON cal_date = day_start WHERE id = $1', idValue)
        return oneSchedule
    } 
    catch (error) {
        return error  
    }
}

// delete event from schedule
async function deleteSchedule(idValue) {
    try {
        const deletedEvent = await database.one('DELETE FROM schedules WHERE id = $1 RETURNING *', idValue)
        return deletedEvent
      
    } 
    catch (error) {
        return error
    }
}

async function updateSchedule(idValue, obj) {
    try {
        const updatedEvent = await database.one(
            'UPDATE schedules SET day_start = $1, title = $2, description = $3, important = $4 WHERE id = $5 RETURNING *',
            [
                obj.day_start,
                obj.title, 
                obj.description,
                obj.important,
                idValue
            ]
        )
        return updatedEvent
    } 
    catch (error) {
        return error
        
    }
}



module.exports = {
    getSchedule,
    createSchedule,
    getOneSchedule,
    deleteSchedule,
    updateSchedule
    
}