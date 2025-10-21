
//get the html elements
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('newQuoteBtn');
const copyQuoteButton = document.getElementById('copyBtn');
const loadingElement = document.getElementById('loading');

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
            alert('Quote copied to clipboard!');
            copyQuoteButton.textContent = '✅ Copied!';
            setTimeout(() => {
                copyQuoteButton.textContent = '📋 Copy Quote';
            }, 1500);
            //copyQuoteButton.textContent = '📋 Copy Quote';
        }).catch((error) => {
            console.error('Error copying quote:', error);
            alert('Failed to copy. Please try again.');
        })
}

copyQuoteButton.addEventListener('click', copyQuote);
