// app.js

// Server Startup Instructions:
// 1. Install dependencies: npm install
// 2. Start the server: node app.js
//
// Client Connection Instructions:
// 1. Connect to the server from the client-side using [Gamerville -> npm run start]

// Very basic
const User = require('./functions/user');
const Game = require('./functions/game');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4200", // or your frontend URL
    methods: ["GET", "POST"]
  }
});
const cors = require('cors');
const portNum = 3000;

app.use(cors());
app.use(express.json());

const users = new Map();

// Suits = ['♡', '♢', '♧', '♤'];

// class Card {
//   rank
//   suit
// }

// var cards = [
//   {rank: 'A', suit: '♤'},
//   {rank: '2', suit: '♤'},
//   {rank: '3', suit: '♤'},
//   {rank: '4', suit: '♤'},
//   {rank: '5', suit: '♤'},
// ]


//TODO: make enum
io.on('connection', (socket) => {
  socket.emit('generate', User.generateID());
  

  socket.on('initTestGame', (playerIDs) => {
    // socket.emit('gameData', Game.newTestGame(playerIDs));
    users.set(socket.id, playerIDs);
    socket.emit('gameData', Array.from(Game.newTestGame(playerIDs).entries()).map(([id, hand]) => ({ id, hand })));
  });

  // Universal Draw Card Call
  // socket.on('drawCard', (playerID) => {
  //   const gameData = Game.drawCard(playerID);
  //   socket.emit('gameData', gameData);
  // });

  socket.on('getCurrentPlayer', () => {
    const currentPlayer = Game.getCurrentPlayer();
    socket.emit('currentPlayer', currentPlayer);
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
    users.delete(socket.id);
  });
});


http.listen(portNum, () => {
  console.log(`Server is active baby! Port is ${portNum}`)
})


