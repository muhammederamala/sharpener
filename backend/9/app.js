const path = require('path');
const http = require('http');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const express = require('express')
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const welcomeRoutes = require('./routes/welcome')

const models = require('./models/z')

const app = express();

app.use(bodyParser.json());
app.use(fileUpload());

app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '10mb' }))

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/user',userRoutes)
app.use('/chat',chatRoutes)
app.use('/',welcomeRoutes)
const sequelize = require('./util/database');

// User.hasMany(Message);
// Message.belongsTo(User);


io.on('connection', (socket) => {
  // Existing connection handling logic
  console.log(`socket client connected, ${socket.id}`);

  // Handle the 'new-group' event
  socket.on('new-group', (groupId) => {
    console.log(`User with socket ID ${socket.id} joined group ${groupId}`);

    // Join the socket to the room
    socket.join(groupId);

    // Use a Promise to wait for the room to be created and retrieve sockets
    new Promise((resolve, reject) => {
      const roomSockets = io.in(groupId).fetchSockets();
      if (roomSockets) {
        resolve(roomSockets);
      } else {
        reject('Room not found or sockets could not be retrieved');
      }
    })
    .then((roomSockets) => {
      console.log(`Sockets in room ${groupId}:`, roomSockets.map((s) => s.id));
    })
    .catch((err) => {
      console.error('Error:', err);
    });
  });

  socket.on('disconnect', () => {
    console.log(`User with socket ID ${socket.id} disconnected`);
  });
});


sequelize.sync()
.then(() =>{
    server.listen(3000)
})
.catch(err =>{
    console.log(err)
})