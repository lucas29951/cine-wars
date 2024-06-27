
document.addEventListener('DOMContentLoaded', () => {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const totalRounds = parseInt(localStorage.getItem('totalRounds')) || 12;
    const currentTurn = parseInt(localStorage.getItem('currentTurn')) || 1;
    const currentRound = parseInt(localStorage.getItem('currentRound')) || 1;
    
    if (currentRound <= (totalRounds / 2)) {
    obtenerConsigna("consignas");
    
    renderPlayersStatus(players);
    renderTurnsBar(totalRounds, currentRound);

    const continueBtn = document.getElementById('continue-btn');
    continueBtn.textContent = currentRound === 1 ? 'Empezar' : 'Continuar';
    
    continueBtn.addEventListener('click', () => {
        if (currentRound > (totalRounds / 2)) {
            startTurn(0);
        } else {
            startTurn(currentTurn);
        }
    });
    } else {
        const statusContainer = document.querySelector('.game-status-container');
        statusContainer.innerHTML = "";
        let titulo = document.createElement('div');
        titulo.textContent = "FIN DEL JUEGO";
        titulo.style.fontSize = "50px";
        titulo.style.fontWeight = 900;
        statusContainer.appendChild(titulo);
        let ganador = document.createElement('div')
        ganador.style.fontSize = "30px";
        ganador.style.fontWeight = 700;
        ganador.textContent = players[0].points > players[1].points ? 'Ganador: ' + players[0].name : 'Ganador: ' + players[1].name;
        statusContainer.appendChild(ganador);
        // alert('Juego Terminado!'); // Aqui podemos redirigir a una pagina donde se muestren los resultados
    }
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

function renderTurnsBar(totalRounds, currentRound) {
    const turnsBar = document.getElementById('turns-bar');
    turnsBar.innerHTML = '';

    for (let i = 1; i <= (totalRounds / 2); i++) {
        const turnElement = document.createElement('div');
        turnElement.classList.add('turn');
        if (i <= currentRound) {
            turnElement.classList.add('active');
        }
        turnsBar.appendChild(turnElement);
    }
}

function startTurn(currentTurn) {
    localStorage.setItem('currentTurn', currentTurn);
    window.location.href = './game.html';
}

