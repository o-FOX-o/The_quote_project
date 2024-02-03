//Fetch data
function fetchData() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/load_quote").then((response) => {
      resolve(response.json());
    });
  });
}

//Aside function
function asideCon() {
  const aside = document.querySelector(".js-aside");
  const asideClicked = document.querySelector(".aside-clicked");
  if (!asideClicked) {
    aside.classList.add("aside-clicked");
  } else {
    asideClicked.classList.remove("aside-clicked");
  }
}

const asideButton = document.querySelector(".js-aside-button");
asideButton.addEventListener("click", () => {
  asideCon();
});

//Rendering quotes

const page = {start: 0,end: 10};

function renderHtml(html){
  const quotesContainer = document.querySelector(".js-quotes-container");
  const pageHtml =  html.slice(page.start,page.end)
  let temperHtml = '';
  pageHtml.forEach((element) => {
    temperHtml += element;
  })
  quotesContainer.innerHTML = temperHtml;
  console.log(pageHtml)
}


async function getQuotes(){
  jsonData = await fetchData();
  data = JSON.parse(jsonData);
  console.log(data.quotesFile)
  return data.quotesFile
}

async function renderQuote() {
  const quotesFile = await getQuotes();
  const html = [];
  quotesFile.forEach(element => {
    const tags = element.tags;
    const quote = element.quote;
    const author = element.author;
    let  tagHtml = ``;
    tags.forEach((tag) =>{
      tagHtml += `<span class="js-tag-button tag-button">${tag}</span>`;
    })
    html.push(`
            <div class="js-quote-div quote-div">

                <p class="js-author-p author-p">Author: <span class="js-author-name author-name">${author}</span></p>

                <p class="js-quote-p quote-p">${quote}</p>

                <div class="js-quote-tags quote-tags">

                    <p class="js-tags-p tags-p"><p class="js-tags-text-p tags-text-p">tags:</p><div class="js-quote-tags-div quote-tags-div">${tagHtml}</div></p>

                </div>

             </div>
             `)
  });
  renderHtml(html);
}
renderQuote();

const nextButton = document.querySelector(".js-next-button");
const previewsButton = document.querySelector(".js-previews-button");

nextButton.addEventListener("click",async () => {
  quotesFile = await getQuotes()
  if(page.end < quotesFile.length){
  page.start += 10;
  page.end += 10;
  renderQuote();
  }
})

previewsButton.addEventListener('click', () => {
  if (page.start > 0){
  page.start -= 10;
  page.end -= 10;
  renderQuote();
  }
})