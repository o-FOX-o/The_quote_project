const fs = require('fs');

let tags = [];

let quotesFile = [];

function getQuotes(){
    fs.readFile('../data/quotes.json','utf-8',(err,data) =>{
    if(!err){
        quotesFile = JSON.parse(data);
    }else {
        console.log("Error reading file!: "+err);
    }
    })
}

function collectTags(){
    const allTags = [];
    console.log(quotesFile)
    quotesFile.forEach((quote) =>{
        quote.tags.forEach((tag)=>{
            allTags.push(tag)
        })  
    })
    console.log(allTags)
}

let prom = new Promise((resolve,reject) => {
    fs.readFile('../data/quotes.json','utf-8',(err,data) =>{
        if(!err){
            resolve(JSON.parse(data));
        }else {
            console.log("Error reading file!: "+err);
            reject(err)
        }
        })
})

prom.then((message) => {
    const tags = new Set();
    message.forEach((quote) =>{
        quote.tags.forEach((tag)=>{
            tags.add(tag)
        })  
    })
    module.exports = tags;
})