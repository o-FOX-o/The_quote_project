const express = require('express');
const fs = require('fs');
const router = express.Router();
const dataFunction = require('../JS/quotes.js')



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

module.exports = router;  
    // fs.readFile('./data/quotes.json','utf-8',(err,data) =>{
    //     if(err){
    //         console.log(`Error: ${err}`);
    //     }else {
    //         res.send(data)
    //         console.log(data)
    //     }
    // })














