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
async function renderQuote() {
  jsonData = await fetchData();
  data = JSON.parse(jsonData);
  const {quotesFile} = data;
  let html = "";
  quotesFile.forEach(element => {
    const tags = element.tags;
    const quote = element.quote;
    const author = element.author;
    let  tagHtml = ``;
    tags.forEach((tag) =>{
      tagHtml += `<span class="js-tag-button tag-button">${tag}</span>`;
    })
    html += `
            <div class="js-quote-div quote-div">

                <p class="js-author-p author-p">Author:<span class="js-author-name author-name">${author}</span></p>

                <p class="js-quote-p quote-p">${quote}</p>

                <div class="js-quote-tags quote-tags">

                    <p class="js-tags-p tags-p">tags: <div class="js-quote-tags-div quote-tags-div">${tagHtml}</div></p>

                </div>

             </div>
             `
  });
  document.querySelector("main").innerHTML = html;
}
renderQuote();
