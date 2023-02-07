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

// function to check if userName is available
async function userExist(string) {
    try {
        const userNameExists = await database.one('SELECT userName FROM users WHERE userName = $1 RETURNING *', string)
     
        return userNameExists
    } 
    catch (err) {
       return err
    }
}


module.exports = {
    createUser,
    userExist,
}