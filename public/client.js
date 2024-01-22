const socket = io();

const form = document.getElementById('send-msg');
const messageContainer = document.querySelector('.message-container');
var audio = new Audio('sound.mp3');

var username;
do {
    username = prompt("Enter your name to join");
    document.getElementById('change-name').innerHTML = username;
} while (!username);

function sendMsg() {
    let inputMessage = document.getElementById('msg-input').value;
    let msg = {
            user: username,
            message: inputMessage,
        }
        //append this msg
    appendMsg(msg, 'send')

    //clean input box
    document.getElementById('msg-input').value = '';

    //send message to server
    socket.emit('send-message', msg)

}

function appendMsg(msg, type) {
    let createDiv = document.createElement('div')
    let className = type
    createDiv.classList.add('complete-msg')

    let addMsg = `
        <p class="${className}-username">${msg.user}</p>
        <div class="message ${className}">${msg.message}</div>
    `
    createDiv.innerHTML = addMsg
    messageContainer.appendChild(createDiv)
    scrollToBottom();
    if (type == 'recieve') {
        audio.play();
    }
}

// recieve messages
socket.on('get-message', (getMsg) => {
    appendMsg(getMsg, 'recieve')
})

function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

let count = 0;
// recieve number of people joined the game
socket.on('get-user-request', (countUser) => {
    count = countUser;
    console.log(count);
})

function checkMaxClient() {
    socket.emit('want-to-play', username)
    if (count < 2) {
        location.href = 'rockpaper.html';

    } else {
        alert("Only Two Player can Play at a time");
    }
    //game join request to server
}