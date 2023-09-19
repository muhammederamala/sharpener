const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 4000;

// Serve files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Enable form data parsing
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    const filePath = path.join(__dirname, 'public', 'home.html');
    res.sendFile(filePath);
});

app.get('/login', (req, res, next) => {
    const filePath = path.join(__dirname, 'public', 'login.html');
    res.sendFile(filePath);
});

app.post('/save-message', (req, res, next) => {
    const username = req.body.username; // Retrieve the username from the form
    const message = req.body.message;

    // Combine the username and message
    const messageToSave = `${username}: ${message}\n`;

    // Check if the message.txt file exists
    fs.access('message.txt', fs.constants.F_OK, (err) => {
        if (err) {
            // If the file doesn't exist, create it and write the message
            fs.writeFile('message.txt', messageToSave, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error saving message.');
                } else {
                    console.log('Message saved successfully.');
                    res.redirect('/'); // Redirect back to the home page
                }
            });
        } else {
            // If the file exists, append the message
            fs.appendFile('message.txt', messageToSave, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error saving message.');
                } else {
                    console.log('Message saved successfully.');
                    res.redirect('/'); // Redirect back to the home page
                }
            });
        }
    });
});

app.get('/get-messages', (req, res) => {
    // Read messages from message.txt and send them as a response
    fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching messages.');
        } else {
            res.send(data);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
