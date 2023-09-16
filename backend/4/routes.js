const fs = require('fs')

const requestHandler = (req,res) => {

    const url = req.url
    const method = req.method

    if(req.url ==='/'){
        // Read existing messages from "message.txt" file
        fs.readFile('message.txt', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              data = ''; // Initialize data as an empty string if there's an error reading the file.
            }
      
            // Create the HTML form with existing messages and a new message input field
            const html = `
              <html>
              <head></head>
              <body>
                <form action="/message" method="POST">
                  <input type="text" name="message" placeholder="Enter your message">
                  <button type="submit">Send</button>
                </form>
                <div>
                  <h2>Existing Messages:</h2>
                  <ul>
                    ${data
                      .split('\n')
                      .filter((message) => message.trim() !== '')
                      .map((message) => `<li>${message}</li>`)
                      .join('')}
                  </ul>
                </div>
              </body>
              </html>
            `;
      
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
          });
    
        }
    
        else if(req.url ==='/message' && req.method === "POST"){
            const body = []
            req.on('data', (chunk) =>{
                console.log(chunk)
                body.push(chunk)
            } )
            req.on('end', () =>{
                const parseBody = Buffer.concat(body).toString()
                const message = parseBody.split('=')[0]
                fs.writeFile('message.txt', message, (err) => {
                    res.statusCode = 302
                    res.setHeader('Location', '/')
                    return res.end()
                })
            })
        }
            else if (req.url === '/home') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome home');
          } else if (req.url === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to About Us page');
          } else if (req.url === '/node') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to my Node.js project');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
          }
}

module.exports = requestHandler

module.exports = {
    handler: requestHandler,
    text: "hello"
}


// module.exports.handler = requestHandler
// module.exports.text = "hello"