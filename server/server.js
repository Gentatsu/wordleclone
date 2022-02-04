const express = require('express');
const app = express();
const fs = require('fs')

async function loadWords() 
{
    const data = await (await fs.promises.readFile('./server/words_5_2.txt', 'utf8')).split("\n");
    return data
}

function getRandomWord(words)
{
    var r = Math.floor(Math.random() * words.length);
    var word = words[r]
    console.log(word)
    return word
}

loadWords().then(words => 
{
    app.get('/word', (req, res) => res.send(getRandomWord(words)))
    app.listen(8080)
}
)