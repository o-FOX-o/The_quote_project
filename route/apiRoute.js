const express = require('express');
const fs = require('fs');
const router = express.Router();

function sendData(){
    return new Promise((resolve) =>{
        let data = require('../JS/quotes')
        console.log(data.tags,'done')
        resolve(data.tags);
    })
    
}

router.get('/load_quote', async (req,res) =>{
    try {
    const tags = await sendData();
    console.log(tags)
    res.json({tags});
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'internal server error'})
    }
})
    // fs.readFile('./data/quotes.json','utf-8',(err,data) =>{
    //     if(err){
    //         console.log(`Error: ${err}`);
    //     }else {
    //         res.send(data)
    //         console.log(data)
    //     }
    // })














module.exports = router;