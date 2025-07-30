// app.js

// Very basic
const Express = require('express')();
const Http = require('http').Server(Express);
const io = require('socket.io')(Http);
const User = require('./functions/user');

// Suits = ['♡', '♢', '♧', '♤'];


class Card {
  rank
  suit
}

var cards = [
  {rank: 'A', suit: '♤'},
  {rank: '2', suit: '♤'},
  {rank: '3', suit: '♤'},
  {rank: '4', suit: '♤'},
  {rank: '5', suit: '♤'},
]


//TODO: make enum
io.on('connection', (socket) => {
  console.log('AN ID IS BEING SENT WITH AN ID:', User.generateID())
  socket.emit('generate', '1000')
})

io.on('disconnect', () => {
  console.log('client disconnected')
})

Http.listen(3000, () => {
  console.log('Server is active baby! Port is 3000')
})
