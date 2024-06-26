document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.play-button');
    const createGameButtons = document.querySelectorAll('.create-game-button');
    const rematchButtons = document.querySelectorAll('.rematch-button');
    const gameContainer = document.querySelector('.game-container');

    if (gameContainer !== null) {
        const mode = localStorage.getItem('gameMode') || 'clasico';

        obtenerConsigna("consignas");
        initializeGame(mode);
    }

    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Jugar');
        });
    });

    createGameButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Crear partida');
        });
    });

    rematchButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Revancha');
        });
    });
});

function initializeGame(mode) {
    switch (mode) {
        case 'clasico':
            startClassicMode();
            break;
        case 'online':
            startOnlineMode();
            break;
        case 'tematico':
            startThematicMode();
            break;
        case 'deathmatch':
            startDeathmatchMode();
            break;
        case 'personalizada':
            startCustomMode();
            break;
        case 'solitario':
            startSoloMode();
            break;
        default:
            console.error('Modo de juego no reconocido');
            break;
    }
}

function startClassicMode() {
    console.log('Iniciando modo Clásico');
    startTimer(60);
}

function startOnlineMode() {
    console.log('Iniciando modo Online');
    startTimer(60);
}

function startThematicMode() {
    console.log('Iniciando modo Temático');
    startTimer(60);
}

function startDeathmatchMode() {
    console.log('Iniciando modo Deathmatch');
    startTimer(60);
}

function startCustomMode() {
    console.log('Iniciando modo Personalizado');
    startTimer(60);
}

function startSoloMode() {
    console.log('Iniciando modo Solitario');
    startTimer(60);
}

function startTimer(seconds) {
    const countdownElement = document.getElementById('time-countdown');
    const timeBarElement = document.getElementById('time-bar');

    let timeLeft = seconds;
    countdownElement.textContent = timeLeft + 's';
    const timerInterval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft + 's';
        timeBarElement.style.width = (timeLeft / seconds * 100) + '%';
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Tiempo agotado');
            window.location.href = "./status.html";
        }
    }, 1000);
}

function navigateTo(page) {
    switch (page) {
        case 'home':
            window.location.href = './index.html';
            break;
        case 'calendar':
            alert('Navegar a Calendario');
            break;
        case 'play':
            window.location.href = './game-modes.html';
            break;
        case 'video':
            alert('Navegar a Video');
            break;
        case 'store':
            alert('Navegar a Tienda');
            break;
        case 'clasico':
            window.location.href = './setup.html';
            break;
        case 'online':
            window.location.href = './game.html';
            break;
        case 'deathmatch':
            window.location.href = './game.html';
            break;
        case 'tematico':
            window.location.href = './game.html';
            break;
        case 'personalizada':
            window.location.href = './game.html';
            break;
        case 'solitario':
            window.location.href = './game.html';
            break;
        default:
            alert('Página no encontrada');
            break;
    }
}
