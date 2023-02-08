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

// delete user
async function deleteUser(idValue) {
    try {
        const deletedUser = await database.one(
            'DELETE FROM users WHERE id = $1, RETURNING *', idValue
        )
        return deletedUser
        
    } 
    catch (error) {
        return error 
    }
}

module.exports = {
    getUser,
    deleteUser
}