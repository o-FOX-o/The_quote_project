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
  data = await fetchData();
  console.log(JSON.parse(data));
}
renderQuote();
