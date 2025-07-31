// app.js

// Very basic
const User = require('./functions/user');
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

app.use(cors());
app.use(express.json());

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
  console.log('Sending id:', User.generateID())
  socket.emit('generate', User.generateID());
})

io.on('disconnect', () => {
  console.log('client disconnected')
})

http.listen(3000, () => {
  console.log('Server is active baby! Port is 3000')
})
