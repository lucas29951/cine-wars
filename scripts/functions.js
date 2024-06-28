
async function getApiData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


async function obtenerConsigna(search) {
    const result = await getApiData(api[search]);
    const orden = aleatorio(1, result.length);
    localStorage.setItem('currentQuestion', JSON.stringify(result[orden - 1]));
}


function aleatorio(inferior, superior) {
    var numPosibilidades = superior - inferior;
    var aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return inferior + aleatorio;
}


function cargarConsigna(result) {
    const question = document.getElementById('question');
    question.textContent = `${result.consigna}`;
}


function createCards(results, search) {
    const eventosContainer = document.querySelector(".events .row");
    eventosContainer.innerHTML = "";
    for (const result of results) {
        eventosContainer.innerHTML += templates[search](result);
    }
    document.querySelectorAll(".comprar-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const evento = JSON.parse(button.getAttribute("data-evento"));
            localStorage.setItem("eventoSeleccionado", JSON.stringify(evento));

            if(event.target.classList.contains("link-card")){
                localStorage.setItem("eventoSeleccionado", JSON.stringify(evento));
            }
        });
    });
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
            localStorage.setItem('selectedMode', "classic");
            window.location.href = './setup.html';
            break;
        case 'online':
            localStorage.setItem('selectedMode', "online");
            window.location.href = './setup.html';
            break;
        case 'deathmatch':
            localStorage.setItem('selectedMode', "deathmatch");
            window.location.href = './setup.html';
            break;
        case 'tematico':
            localStorage.setItem('selectedMode', "theme");
            window.location.href = './setup.html';
            break;
        case 'personalizada':
            localStorage.setItem('selectedMode', "custom");
            window.location.href = './setup.html';
            break;
        case 'solitario':
            localStorage.setItem('selectedMode', "solo");
            window.location.href = './setup.html';
            break;
        default:
            alert('Página no encontrada');
            break;
    }
}


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
        timeBarElement.style.width = (timeLeft / seconds * 80) + '%';
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Tiempo agotado');
            window.location.href = "./status.html";
        }
    }, 1000);
}


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


function updateGameScreen(currentPlayerElement, currentPlayer, questionElement, currentQuestion) {
    currentPlayerElement.textContent = currentPlayer.name;
    questionElement.textContent = currentQuestion.consigna;
}


function nextTurn(currentTurn, players, currentRound, totalRounds) {
    currentTurn++;
    if (currentTurn > players.length) {
        currentTurn = 1;
        currentRound++;
    }
    localStorage.setItem('currentTurn', currentTurn);
    localStorage.setItem('currentRound', currentRound);
    // localStorage.setItem('currentQuestion', questionElement.textContent);

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

