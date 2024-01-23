let object = '';

function getTags(){
fetch('http://localhost:3000/api/load_quote')
.then(response => response.json())
.then((data) =>{
    object = JSON.parse(data);
    console.log(object)
    })
} 

function displayTags(){
    console.log(object.tags)
}

function displayQuotes(){
    console.log(object.quotesFile)
}