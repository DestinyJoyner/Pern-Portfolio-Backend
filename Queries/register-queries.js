const database = require("../database/databaseConfig.js")

// create account
async function createUser (obj) {
    try {
        const newUser = await database.one(
            'INSERT INTO users (userName, password,admin_access) VALUES ($1, $2, $3) RETURNING *', 
            [
                obj.userName,
                obj.password,
                obj.admin_access
            ]
        )
    return newUser 

    } 
    catch (error) {
        return error
        
    }
}


module.exports = {
    createUser,
}