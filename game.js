document.addEventListener('DOMContentLoaded', () => {
    let players = JSON.parse(localStorage.getItem('players'));
    let totalRounds = parseInt(localStorage.getItem('totalRounds'));
    let currentTurn = parseInt(localStorage.getItem('currentTurn'));
    let currentRound = parseInt(localStorage.getItem('currentRound'));
    let currentPlayerIndex = (currentTurn - 1) % players.length;
    let currentPlayer = players[currentPlayerIndex];

    const currentPlayerElement = document.getElementById('current-player');
    const questionElement = document.getElementById('question');
    const passBtn = document.getElementById('pass-btn');
    const confirmBtn = document.getElementById('confirm-btn');

    function updateGameScreen() {
        currentPlayerElement.textContent = currentPlayer.name;
        // questionElement.textContent = 'Pregunta o Consigna para ' + currentPlayer.name;
    }

    passBtn.addEventListener('click', () => {
        nextTurn();
    });

    confirmBtn.addEventListener('click', () => {
        currentPlayer.points += 10; // Supongamos que cada respuesta correcta suma 10 puntos
        localStorage.setItem('players', JSON.stringify(players));
        nextTurn();
    });

    function nextTurn() {
        currentTurn++;
        if (currentTurn > players.length) {
            currentTurn = 1;
            currentRound++;
        }
        localStorage.setItem('currentTurn', currentTurn);
        localStorage.setItem('currentRound', currentRound);
        localStorage.setItem('currentQuestion', questionElement.textContent);

        if (currentRound > totalRounds) {
            alert('Juego Terminado');
            window.location.href = './status.html'; // O redirigir a una página de resultados finales
        } else {
            if (currentTurn === 1) {
                window.location.href = './status.html';
            } else {
                window.location.href = './game.html';
            }
        }
    }

    updateGameScreen();
    startTimer(60);
});
