const database = require("../database/databaseConfig.js")

async function getSchedule (userIdValue){
    try {
        const userSchedule = await database.any('SELECT * FROM schedules WHERE user_id =$1', userIdValue)

        return userSchedule
    } 
    catch (error) {
        return error
        
    }

}




module.exports = {
    getSchedule,
}