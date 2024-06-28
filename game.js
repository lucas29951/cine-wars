document.addEventListener('DOMContentLoaded', () => {
    let players = JSON.parse(localStorage.getItem('players'));
    let totalRounds = parseInt(localStorage.getItem('totalRounds'));
    let currentTurn = parseInt(localStorage.getItem('currentTurn'));
    let currentRound = parseInt(localStorage.getItem('currentRound'));
    let currentQuestion = JSON.parse(localStorage.getItem('currentQuestion'));
    let currentPlayerIndex = (currentTurn - 1) % players.length;
    let currentPlayer = players[currentPlayerIndex];

    const currentPlayerElement = document.getElementById('current-player');
    const questionElement = document.getElementById('question');
    const passBtn = document.getElementById('pass-btn');
    const confirmBtn = document.getElementById('confirm-btn');


    passBtn.addEventListener('click', () => {
        nextTurn(currentTurn, players, currentRound, totalRounds);
    });

    confirmBtn.addEventListener('click', () => {
        currentPlayer.points += currentQuestion.puntos;
        // currentPlayer.points += 10; // Supongamos que cada respuesta correcta suma 10 puntos
        localStorage.setItem('players', JSON.stringify(players));
        nextTurn(currentTurn, players, currentRound, totalRounds);
    });

    updateGameScreen(currentPlayerElement, currentPlayer, questionElement, currentQuestion);
    startTimer(60);
});
