// app.js

// Very basic
const Express = require('express')();
const Http = require('http').Server(Express);
const SocketIO = require('socket.io')(Http);
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

//
const ids = []






//TODO: make enum
SocketIO.on('connection', (socket) => {
  socket.emit('cards', cards)
})

SocketIO.on('generate', (socket) => {
  socket.emit('id', User.generateID())
})

Http.listen(3000, () => {
  console.log('Server is active baby! Port is 3000')
})
