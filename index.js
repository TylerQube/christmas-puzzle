const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/puzzle1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'puzzle1.html'));
    console.log("Req for puzzle received");
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})

