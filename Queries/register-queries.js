const database = require("../database/databaseConfig.js")

// create account
async function createUser (obj) {
    try {
        const newUser = await database.one(
            'INSERT INTO users (userName, password) VALUES ($1, $2) RETURNING *', 
            [
                obj.userName,
                obj.password
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
        const userNameExists = await database.one('SELECT username FROM users WHERE username = $1', string)
     
        return userNameExists
    } 
    catch (err) {
       return err
    }
}

// delete user
async function deleteUser(idValue) {
    try {
        const deletedUser = await database.one(
            'DELETE FROM users WHERE id = $1 RETURNING *', idValue
        )
        return deletedUser
        
    } 
    catch (error) {
        return error 
    }
}


module.exports = {
    createUser,
    userExist,
    deleteUser,
}