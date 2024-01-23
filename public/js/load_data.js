let data = '';

fetch('http://localhost:3000/api/load_quote')
.then(response => response.json())
.then((res) =>{
    data = JSON.parse(res);
    })


