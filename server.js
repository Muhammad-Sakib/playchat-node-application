const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.port || 8000

http.listen(PORT, () => {
    console.log("hello", PORT)
})

app.use(express.static(__dirname + '/public')) // to show directory of other files like index.css

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})





let countUser = 0;
var player1 = 'Joining';
var player2 = 'Joining';
var player1_move = null;
var player2_move = null;
let checkPlayerMove = 0;

// Node server which will handle socket io connectiions

//import socket.io
const io = require('socket.io')(http) //initializing the port

const users = {};
io.on('connection', (socket) => {
    console.log('connected..', socket.id)
    socket.emit('get-user-request', countUser)
    if (countUser == 2) {
        socket.emit('get-player-name', player1)
    }


    socket.broadcast.emit('total')
    socket.on('send-message', (msg) => {
        users[socket.id] = msg.user;
        socket.broadcast.emit('get-message', msg); // forward to other client
    })

    //socket.on means if that event happened
    //get join request from server

    socket.on('want-to-play', (uname) => {
        if (countUser == 0) {
            player1 = uname;
        } else {
            player2 = uname;
        }
        countUser = countUser + 1;
        console.log(countUser, uname)
        socket.broadcast.emit('get-user-request', countUser)
        socket.broadcast.emit('get-player-name', player2)
    })

    socket.on('send-move', (clientMove) => {
        checkPlayerMove++;
        if (checkPlayerMove == 1) {
            player1_move = clientMove
            console.log(player1_move);
        } else if (checkPlayerMove == 2) {
            player2_move = clientMove
            console.log(player2_move);
            socket.emit('get-move', player1_move)
            socket.broadcast.emit('get-move', player2_move)
                //checkWinner();
        }
        if (checkPlayerMove >= 2) {
            checkPlayerMove = 0;
        }

    })
})