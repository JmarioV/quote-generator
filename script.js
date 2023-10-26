// Global variables
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const btnTwitter = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const local = false;
let apiQuotes = [];
 
// Show & Hide Loader
function showLoader(yes) {
    loader.hidden = !yes;
    quoteContainer.hidden = yes;
}

// Show new Quote
function newQuote() {
    showLoader(true);
    let quote = '';
    if (local)
       // pick a random quote from localQuotes array
       quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    else
       // pick a random quote from apiQuotes array
       quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    
    //console.log(quote);
    // Check if author field is blank and replace it
    if (!quote.author)
        quoteAuthor.textContent = 'Unknown'
    else
        quoteAuthor.textContent = quote.author;
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, hide loader
    quoteText.textContent = quote.text;
    showLoader(false);
}

 // Get Quotes from API
 async function getQuotes() {
    showLoader(true);
    // const apiUrl = 'https://type.fit/api/quotes';
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here
    }
 }
// DOES NOT WORK
 async function getQuote2() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        // Catch error here
        //getQuotes();
        console.log('Error ... no quote', error)
    }
 }
 
// TWEET a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.Text.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
btnTwitter.addEventListener('click', tweetQuote);
btnNewQuote.addEventListener('click', newQuote);

// On Load
if (local)
    newQuote()
else
    getQuotes()
