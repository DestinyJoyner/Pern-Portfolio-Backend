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

//get user by id
async function getUserId (idValue) {
    try {
        const user = await database.one('SELECT * FROM users WHERE id = $1', idValue)
        return user
        
    } 
    catch (error) {
        return error
        
    }

}


module.exports = {
    getUser,
    getUserId
}