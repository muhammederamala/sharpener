const express = require('express');
const path = require('path');

const app = express();

const port = 4000;

// Serve files from the "pages" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    const filePath = path.join(__dirname, 'public', 'home.html');
    res.sendFile(filePath);
});

app.get('/chat', (req, res, next) => {
    res.send("<h1>Welcome</h1>");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
