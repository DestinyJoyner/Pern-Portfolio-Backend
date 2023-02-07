const database = require("../database/databaseConfig.js")

//get ONE user
async function getUser(string) {
    try {
        const user = await database.one('SELECT * FROM users WHERE userName = $1', string)
        return user
        
    } 
    catch (error) {
        return error
        
    }
}

module.exports = {
    getUser
}