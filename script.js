document.addEventListener('DOMContentLoaded', () => {
    // Aquí puedes añadir los eventos y funcionalidades necesarias
    const playButtons = document.querySelectorAll('.play-button');
    const createGameButtons = document.querySelectorAll('.create-game-button');
    const rematchButtons = document.querySelectorAll('.rematch-button');
    const gameContainer = document.querySelector('.game-container');

    if (gameContainer !== null) {
        document.getElementById('pass-btn').addEventListener('click', passQuestion);
        document.getElementById('confirm-btn').addEventListener('click', confirmAnswer);

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
    startTimer(60); // Example: 60 seconds per round
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
        }
    }, 1000);
}

function passQuestion() {
    alert('Pregunta pasada');
    // Aquí puedes implementar la lógica para pasar la pregunta
}

function confirmAnswer() {
    alert('Respuesta confirmada');
    // Aquí puedes implementar la lógica para confirmar la respuesta
}

function navigateTo(page) {
    switch (page) {
        case 'home':
            //alert('Navegar a Home');
            window.location.href = './index.html';
            break;
        case 'calendar':
            alert('Navegar a Calendario');
            break;
        case 'play':
            //alert('Navegar a Jugar');
            window.location.href = './game-modes.html';
            break;
        case 'video':
            alert('Navegar a Video');
            break;
        case 'store':
            alert('Navegar a Tienda');
            break;
        case 'clasico':
            // alert('Modo de Juego: Clásico');
            window.location.href = './game.html';
            break;
        case 'online':
            // alert('Modo de Juego: Online');
            window.location.href = './game.html';
            break;
        case 'deathmatch':
            // alert('Modo de Juego: Deathmatch');
            window.location.href = './game.html';
            break;
        case 'tematico':
            // alert('Modo de Juego: Temático');
            window.location.href = './game.html';
            break;
        case 'personalizada':
            // alert('Modo de Juego: Personalizada');
            window.location.href = './game.html';
            break;
        case 'solitario':
            // alert('Modo de Juego: Solitario');
            window.location.href = './game.html';
            break;
        default:
            alert('Página no encontrada');
            break;
    }
}
