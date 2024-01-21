const socket = io()
let player_1_move;
let player_2;
let countChance = 7;


socket.on('get-player-name', (username) => {
    document.getElementById('another-user').innerHTML = username
    document.getElementById('player-two').innerHTML = username + '\'s Choice'
    player_2 = username
    console.log(username)
})

function checkMove(selectedMove) {
    document.getElementById('self-move').innerHTML = 'You played ' + selectedMove
    socket.emit('send-move', selectedMove)
    player_1_move = selectedMove;
    setImg(player_1_move, box1)
}
socket.on('get-move', player_2_move => {
    document.getElementById('opinion-move').innerHTML = player_2 + ' played ' + player_2_move
    checkWinner(player_1_move, player_2_move);
})

let winner;

function checkWinner(player_1_move, player_2_move) {
    if ((player_1_move == 'Paper' && player_2_move == 'Rock') || (player_1_move == 'Rock' && player_2_move == 'Scissors') || (player_1_move == 'Scissors' && player_2_move == 'Paper')) {
        winner = 'You win!'
        alert(winner)
    } else if ((player_2_move == 'Paper' && player_1_move == 'Rock') || (player_2_move == 'Rock' && player_1_move == 'Scissors') || (player_2_move == 'Scissors' && player_1_move == 'Paper')) {
        winner = player_2 + ' win!'
        alert(winner)
    } else {
        winner = 'Draw!'
        alert(winner)
    }

    countChance--;
    document.getElementById('changes').innerHTML = countChance + ' chances left';
    document.getElementById('win').innerHTML = winner;
    let table_row = `
                        <td>${player_1_move}</td>
                        <td>${player_2_move}</td>
                        <td>${winner}</td>
                    `
    let createRow = document.createElement('tr');
    createRow.innerHTML = table_row
    document.getElementById('score-table').appendChild(createRow)

}

function setImg(move, box) {
    if (move == 'Rock') {
        document.getElementById('box1').innerHTML += `<img src="assets/rock.png">`
    } else if (move == 'Paper') {
        document.getElementById('box1').innerHTML += `<img src="assets/paper.png">`
    } else if (move == 'Scissors') {
        document.getElementById('box1').innerHTML += `<img src="assets/scissors.png">`
    }
}