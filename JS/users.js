const fs = require("fs");

//get user List
function readUsersFile(filePath){
    return new Promise((resolve, reject) => {
        fs.readFile(filePath,"utf-8", (err, data) => {
            if (!err) {
                resolve(JSON.parse(data));
            }else {
                reject(console.log('Error reading users file: ',err))
            }
            
        })
})
}

async function getUsersList(filePath){
    const usersList = await readUsersFile(filePath);
    return usersList
}

//Add user

async function addUser(filePath,username,password){
    const userList = await readUsersFile(filePath);
    userList.push({ username , password});
    fs.writeFile(filePath, JSON.stringify(userList,null,2), 'utf-8', (err) => {
        if (err) {
            console.log("There was an error writing the file: ",err);
        } else{
            console.log(`${username} added to the list`);
        }
    }); 
}


module.exports = {getUsersList,addUser} ;
