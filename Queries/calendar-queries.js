const database = require("../database/databaseConfig.js")

// GET ALL DATES
async function getAllDates() {
    try {
        const calendar = await database.any('SELECT * FROM calendar')
        return calendar
        
    } 
    catch (error) {
        return error
        
    }
}

async function getOneDate(dateStamp) {
    try {
        const thisDate = await database.one(
            'SELECT * FROM calendar WHERE cal_date = $1', dateStamp
        )
        return thisDate
        
    } 
    catch (error) {
        return error
    }
}


module.exports = {
    getAllDates,
    getOneDate
}