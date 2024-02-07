const express = require('express');
const fs = require('fs');
const router = express.Router();
const dataFunction = require('../JS/data.js');
const user = require('../JS/users.js');
const path = require('path')

router.get('/load_quote',async (req,res) =>{
    try {
    const data = await dataFunction('./data/quotes.json');
    const response = JSON.stringify(data)
    res.json(response);
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'internal server error'})
    }
})

router.post('/register',async (req, res) => {
    const {username , password} = await req.body;
    const usersList = await  user.getUsersList("./data/users_list.json"); 
    let userExist = false;
    usersList.forEach(userAccount => {
    
        userAccount.username === username ? userExist = true: false;

    });
    if (userExist === false) {
        user.addUser("./data/users_list.json",username,password);
        res.json(JSON.stringify(true));
    }else {
        res.json(JSON.stringify(false));
    }
});

router.post('/login',async (req, res) => {
    const {username , password} = await req.body;
    const usersList = await  user.getUsersList("./data/users_list.json"); 
    let userExist = false;
    let correctPassword = false;
    let accountIndex;
    usersList.forEach((userAccount,index) => {
        if (userAccount.username === username) {
            userExist = true;
            accountIndex= index;
            userAccount.password === password ? correctPassword = true : false ;
            correctPassword === true ? router.use(express.static(path.join(__dirname, "user_public"))):
            res.json(JSON.stringify("wrong password"));
        }
    });
        const response = {userExist,correctPassword};
        res.json(JSON.stringify(response));
});

module.exports = router;  















