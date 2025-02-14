document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.play-button');
    const createGameButtons = document.querySelectorAll('.create-game-button');
    const rematchButtons = document.querySelectorAll('.rematch-button');
    const gameContainer = document.querySelector('.game-container');
    const gameList = document.querySelector('.game-list');
    
    if (gameList !== null) {
        gameList.innerHTML = '';
        showPartidas(gameList);
    }

    if (gameContainer !== null) {
        const mode = localStorage.getItem('gameMode') || 'clasico';

        obtenerConsigna("consignas");
        initializeGame(mode);
    }

    playButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'views/game-modes.html';
        });
    });

    createGameButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'views/game-modes.html';
        });
    });

    rematchButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Revancha');
        });
    });
});
