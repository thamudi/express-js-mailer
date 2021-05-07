'use strict';

// const jokes = 'https://official-joke-api.appspot.com/random_joke';
const quoteUrl = 'https://favqs.com/api/qotd';
const quoteNode = document.getElementById('quote');
const wellNode = document.getElementById('well');

(async () => {
    try {
        const rawResponse = await fetch(quoteUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        const response = await rawResponse.json();
        renderQuote(response);
    } catch (error) {
        wellNode.textContent = 'Seems that the favorite quote api is down again! '
    }

})();

const renderQuote = (response) => {
    const { author, body } = response.quote;

    const quoteBody = document.createElement('p');
    const quoteAuthor = document.createElement('p');
    quoteBody.textContent = `"${body}"`;
    quoteAuthor.setAttribute('class', 'author');
    quoteAuthor.textContent = author;

    quoteNode.appendChild(quoteBody);
    quoteNode.appendChild(quoteAuthor);

}