
//get the html elements
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('newQuoteBtn');
const copyQuoteButton = document.getElementById('copyBtn');
const loadingElement = document.getElementById('loading');
let quoteHistory = [];

async function fetchQuote() {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();

        const { quote, author } = data;
        return { quote, author };

    }catch (error) {
        console.error('Error fetching quote:', error);
        return {
            quote: 'An error occurred while fetching the quote.',
            author: ''
        };
    }

}

async function displayNewQuote() {
    // disable the button for preventing multiple clicks at a time
    newQuoteButton.disabled = true;
    newQuoteButton.textContent = `⏳ Loading...`;

    // fetching the quote
    const { quote, author } = await fetchQuote();

    // Adding quote to history
    quoteHistory.push({ quote, author });

    // Keeping history size to max 3
    if (quoteHistory.length > 3) {
        quoteHistory = quoteHistory.slice(-3);
    }

    // Updating history display
    displayHistory();

    // updating the html elements
    quoteElement.textContent = `${quote}`;
    authorElement.textContent = `— ${author}`;

    // Renabling the button
    newQuoteButton.disabled = false;
    newQuoteButton.textContent = '🔄 New Quote';

}

newQuoteButton.addEventListener('click', displayNewQuote);
displayNewQuote(); // Display a quote when the page loads


function copyQuote() {
    const quoteText = quoteElement.textContent;
    const authorText = authorElement.textContent;
    const fullContent = `${quoteText} ${authorText}`;

    navigator.clipboard.writeText(fullContent)
        .then(() => {
            //alert('Quote copied to clipboard!');
            const originalText = copyQuoteButton.textContent;
            copyQuoteButton.textContent = '✅ Copied!';
            copyQuoteButton.style.background = '#48bb78';
            setTimeout(() => {
                copyQuoteButton.textContent = originalText;
                copyQuoteButton.style.background = '';
            }, 1500);
            //copyQuoteButton.textContent = '📋 Copy Quote';
        }).catch((error) => {
            console.error('Error copying quote:', error);
            alert('Failed to copy. Please try again.');
        })
}

copyQuoteButton.addEventListener('click', copyQuote);

function displayHistory() {
    const historyElement = document.getElementById('history');

    const historyHTML = quoteHistory.map((item) => {
        const { quote, author } = item;

        return `<li>"${quote}" — ${author}</li>`;
    }).join('');

    // updating the DOM
    historyElement.innerHTML = historyHTML;
}