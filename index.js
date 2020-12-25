const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const { nextTick } = require('process');
const dotenv = require('dotenv');
const cfg = dotenv.config().parsed;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: cfg.SSN_SECRET
}));

const codes = [
    'JE5RD8DY',
    'M33K5Q7C',
    'AK8KB45C',
    'LUDF8S9W',
    'R9AR5WHE',
    'LRUPLHY5',
]

app.get('/', (req, res) => {
    if(req.session.complete) {
        res.redirect('/final-prize');
        res.end();
    }
    console.log("sending index.html");
    console.log("curPuzzle session var is " + req.session.curPuzzle);
    if(!req.session.curPuzzle) {
        req.session.curPuzzle = 1;
        console.log("resetting current puzzle session var...");
    } 
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.sendFile(path.join(__dirname, 'public', 'finalPrize' , 'finalPrize.html'));

});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/puzzle:num', (req, res) => {
    if(isNaN(req.params.num)) {
        res.redirect('/');
    } 
    if(req.session.curPuzzle < parseInt(req.params.num)) {
        console.log("sending index file.");
        res.redirect('/');
    } else {
        console.log("sending puzzle " + req.params.num);
        res.sendFile(path.join(__dirname, 'public', `puzzle${req.params.num}` , `puzzle${req.params.num}.html`));
    }
});

app.get('/curPuzzle', (req, res) => {
    if(!req.session.curPuzzle) {
        req.session.curPuzzle = 1;
        console.log("Setting curpuzzle to 1");
    }
    res.json({ "curPuzzle" : req.session.curPuzzle });
});

app.post('/puzzle:num/submit', (req, res) => {
    if(isNaN(req.params.num)) {
        res.redirect('/');
    } 
    
    const puzzleNum = parseInt(req.params.num);
    const enteredCode = req.body.code;
    const correctCode = codes[puzzleNum-1];
    const isCorrect = enteredCode == correctCode;
    
    console.log(`Puzzle #${puzzleNum} submitted!`);
    console.log(`Correct code: ${codes[puzzleNum-1]}`)
    if (isCorrect) {
        if (req.session.curPuzzle < puzzleNum+1 || !req.session.curPuzzle) req.session.curPuzzle = puzzleNum+1;
        console.log("Code is correct!");
        console.log("Advancing to Puzzle #" + req.session.curPuzzle);

        if(puzzleNum == 6) {
            console.log("All puzzles complete!");
            req.session.complete = true;
        }
    } else {
        console.log(`${enteredCode} != ${correctCode}`);
        console.log("Code is incorrect!");
    }
    res.json({ "isCorrect" : isCorrect });
});

app.get('/final-prize', (req, res) => {
    if(!req.session.complete) {
        res.redirect('/');
        res.end();
    }
    res.sendFile(path.join(__dirname, 'public', 'finalPrize' , 'finalPrize.html'));
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})

