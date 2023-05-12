const apiUrl = "https://type.fit/api/quotes";

const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const nextQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");

let apiQuotes = [];

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //   Check if author exists
  if (!quote.author) authorText.textContent = "Unknown";
  else authorText.textContent = quote.author;

  quoteText.textContent = quote.text;
  complete();
}

// Get quotes from API
const getData = function (url) {
  loading();
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => {
      apiQuotes = data;
      // console.log(apiQuotes);
      newQuote();
    })
    .catch((err) => {
      const divErr = `<div class="show-error">Page not found ${err}</div>`;
      quoteContainer.innerHTML = divErr;
      complete();
    });
};

getData(apiUrl);

// Tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// add eventLisener on the twitterBtn
twitterBtn.addEventListener("click", tweetQuote);

// add eventLisenet on the nextQuoteBtn
nextQuoteBtn.addEventListener("click", newQuote);
