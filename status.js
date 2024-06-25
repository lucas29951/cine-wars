document.addEventListener('DOMContentLoaded', () => {
    const players = JSON.parse(localStorage.getItem('players')) || 
    [
        {name: "Jugador 1", profilePic: './img/blank-profile.png', points: 25},
        {name: "Jugador 2", profilePic: './img/blank-profile.png', points: 10}
    ];
    const totalTurns = parseInt(localStorage.getItem('totalTurns')) || 6;
    const currentTurn = parseInt(localStorage.getItem('currentTurn')) || 1;

    renderPlayersStatus(players);
    renderTurnsBar(totalTurns, currentTurn);

    const continueBtn = document.getElementById('continue-btn');
    continueBtn.textContent = currentTurn === 1 ? 'Empezar' : 'Continuar';
    
    continueBtn.addEventListener('click', () => {
        if (currentTurn >= totalTurns) {
            startTurn(0);
        } else {
            startTurn(currentTurn);
        }
    });
});

function renderPlayersStatus(players) {
    const playersStatusContainer = document.getElementById('players-status');
    playersStatusContainer.innerHTML = '';

    players.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('player');

        const playerImg = document.createElement('img');
        playerImg.src = player.profilePic || './img/blank-profile.png';
        playerImg.alt = `Foto de ${player.name}`;

        const playerName = document.createElement('div');
        playerName.classList.add('player-name');
        playerName.textContent = player.name;

        const playerPoints = document.createElement('div');
        playerPoints.classList.add('player-points');
        playerPoints.textContent = `${player.points} puntos`;

        playerElement.appendChild(playerImg);
        playerElement.appendChild(playerName);
        playerElement.appendChild(playerPoints);

        playersStatusContainer.appendChild(playerElement);
    });
}

function renderTurnsBar(totalTurns, currentTurn) {
    const turnsBar = document.getElementById('turns-bar');
    turnsBar.innerHTML = '';

    for (let i = 1; i <= totalTurns; i++) {
        const turnElement = document.createElement('div');
        turnElement.classList.add('turn');
        if (i <= currentTurn) {
            turnElement.classList.add('active');
        }
        turnsBar.appendChild(turnElement);
    }
}

function startTurn(currentTurn) {
    localStorage.setItem('currentTurn', currentTurn + 1);
    window.location.href = './game.html';
}

