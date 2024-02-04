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

//Get tags 

async function getTags(){
  jsonData = await fetchData();
  data = JSON.parse(jsonData);
  console.log(data)
  return data.tags;
}

//Rendering aside tags

async function renderAsideTags(){
  const tags = await getTags();
  let tagsHtml = '';
  const asideTagsContainer = document.querySelector('.js-aside-tags-container-div')
  tags.forEach((tag) => {
    tagsHtml += `<button data-tag-name="${tag}" class="js-tag-button aside-tag-button">${tag}</button>` ;
  })
  asideTagsContainer.innerHTML = tagsHtml;
  tagsOnclick();
}

//Get quotes

async function getQuotes(){
  jsonData = await fetchData();
  data = JSON.parse(jsonData);
  return data.quotesFile
}

//Rendering quotes

const page = {start: 0,end: 10};

let allPagesQuotes = [];

function renderHtml(html){
  const quotesContainer = document.querySelector(".js-quotes-container");
  const pageHtml =  html.slice(page.start,page.end)
  let temperHtml = '';
  pageHtml.forEach((element) => {
    temperHtml += element;
  })
  quotesContainer.innerHTML = temperHtml;

}

async function renderQuote(data = getQuotes()) {
  const html = [];
  const dataArray = await data;
  allPagesQuotes = dataArray;
  dataArray.forEach(element => {
    const tags = element.tags;
    const quote = element.quote;
    const author = element.author;
    let  tagHtml = ``;
    tags.forEach((tag) =>{
      tagHtml += `<span data-tag-name="${tag}" class="js-tag-button tag-button">${tag}</span>`;
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
  // tagsOnclick();
  nextButtonAddEvent();
  previewsButtonAddEvent();
}


const nextButton = document.querySelector(".js-next-button");
const previewsButton = document.querySelector(".js-previews-button");

//Page control
function nextButtonAddEvent(){
  nextButton.addEventListener("click",async () => {
    if(page.end < allPagesQuotes.length){
    page.start += 10;
    page.end += 10;
    renderQuote(allPagesQuotes);
    tagsOnclick();
    }
  })
}

function previewsButtonAddEvent(){
  previewsButton.addEventListener('click', () => {
    if (page.start > 0){
    page.start -= 10;
    page.end -= 10;
    renderQuote(allPagesQuotes);
    tagsOnclick();
    }
  })
}
//Add eventlistener to tags
async function tagsOnclick(){
  const tagButton = await document.querySelectorAll(".js-tag-button")
    tagButton.forEach(async (element) =>{
      const buttons = await element;
      buttons.addEventListener('click', async (event) => {
        const button = await event.target;
        console.log(button);
        const quotesFile = await getQuotes()
        const tag = button.getAttribute('data-tag-name')
        const filterQuotes = [];
        quotesFile.forEach((quote) => {
          const quoteTags = quote.tags;
          if(quoteTags.includes(tag)){
            filterQuotes.push(quote)
          }
        });
        renderQuote(filterQuotes);
        allPagesQuotes = filterQuotes;
        tagsOnclick();
    })
  })
}

async function  mainFun(){
  await renderQuote();
  await renderAsideTags();
}

mainFun()