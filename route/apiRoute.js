const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/load_quote',(req,res) =>{
    fs.readFile('./data/quotes.json','utf-8',(err,data) =>{
        if(err){
            console.log(`Error: ${err}`);
        }else {
            res.send(data)
            console.log(data)
        }
    })
})














module.exports = router