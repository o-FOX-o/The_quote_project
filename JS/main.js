let quotes = [];

async function getQuotes() {
const response = await fetch('http://localhost:3000/api/load_quote');
quotes = await response.json();
console.log(quotes)
}