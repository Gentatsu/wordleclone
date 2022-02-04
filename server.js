const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path');

const wordpath = path.join(__dirname, "words", 'words_5_2.txt');
const port = process.env.PORT || 5000;

async function loadWords() 
{
    
    const data = await (await fs.promises.readFile(wordpath, 'utf8')).split("\n");
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
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('/word', (req, res) => res.send(getRandomWord(words)))
    // app.get('/public', (req, res) => {res.sendFile(path.join(__dirname+'/public/'));})
    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
    app.listen(port)
})