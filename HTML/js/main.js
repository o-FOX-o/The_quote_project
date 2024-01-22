
 function getTags(){
    fetch('api/load_quote')
    .then(response => response.json())
    .then((data) =>{
        console.log(data)
    })
}