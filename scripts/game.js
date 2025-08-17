document.addEventListener('DOMContentLoaded', () => {
    let gameMode = localStorage.getItem('selectedMode');

    switch (gameMode) {
        case 'classic':
            loadClassicMode();
            break;
        case 'rulete':
            loadRuleteMode();
            break;
        case 'actors':
            obtenerActor("actores")
            loadActorsMode();
            break;
    }

    function loadClassicMode() {
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
            localStorage.setItem('players', JSON.stringify(players));
            nextTurn(currentTurn, players, currentRound, totalRounds);
        });

        updateGameScreen(currentPlayerElement, currentPlayer, questionElement, currentQuestion);
        startTimer(60);
    }

    function loadRuleteMode() {
        const gameContainer = document.querySelector(".game-container");
        gameContainer.innerHTML = "";

        const ruleteContainer = document.createElement("div");
        ruleteContainer.classList.add("rulete-container");

        const lettersSection = document.createElement("div");
        lettersSection.classList.add("rulete-section");

        const letterDisplay = document.createElement("div");
        letterDisplay.classList.add("rulete-display");
        letterDisplay.classList.add("letters");
        letterDisplay.textContent = "A";

        const letterButton = document.createElement("button");
        letterButton.classList.add("btn-rulete");
        letterButton.classList.add("init");
        letterButton.textContent = "Iniciar";

        let letterInterval;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        letterButton.addEventListener("click", () => {
            if (letterButton.textContent === "Iniciar") {
                letterInterval = setInterval(() => {
                    const randomIndex = Math.floor(Math.random() * letters.length);
                    letterDisplay.textContent = letters[randomIndex];
                }, 100);
                letterButton.textContent = "Detener";
                letterButton.classList.replace('init', 'end')
            } else {
                clearInterval(letterInterval);
                letterButton.textContent = "Iniciar";
                letterButton.classList.replace('end', 'init');
                letterDisplay.classList.add("selected-animation");
                setTimeout(() => {
                    letterDisplay.classList.remove("selected-animation");
                }, 1000);
            }
        });

        lettersSection.appendChild(letterDisplay);
        lettersSection.appendChild(letterButton);

        const categoriesSection = document.createElement("div");
        categoriesSection.classList.add("rulete-section");

        const categoryDisplay = document.createElement("div");
        categoryDisplay.classList.add("rulete-display");
        categoryDisplay.classList.add("categories");
        categoryDisplay.textContent = "Categoría";

        const categoryButton = document.createElement("button");
        categoryButton.classList.add("btn-rulete");
        categoryButton.classList.add("init");
        categoryButton.textContent = "Iniciar";

        let categoryInterval;
        const categories = [
            "Ciencia Ficción", "Películas Animadas", "Series de TV", "Actores",
            "Superhéroes", "Villanos", "Comedia", "Drama", "Premios Oscar",
            "Cine de Terror", "Clásicos del Cine", "Musicales", "Documentales",
            "Películas Románticas", "Cine Independiente"
        ];

        categoryButton.addEventListener("click", () => {
            if (categoryButton.textContent === "Iniciar") {
                categoryInterval = setInterval(() => {
                    const randomIndex = Math.floor(Math.random() * categories.length);
                    categoryDisplay.textContent = categories[randomIndex];
                }, 120);
                categoryButton.textContent = "Detener";
                categoryButton.classList.replace('init', 'end');
            } else {
                clearInterval(categoryInterval);
                categoryButton.textContent = "Iniciar";
                categoryButton.classList.replace('end', 'init');
                categoryDisplay.classList.add("selected-animation");
                setTimeout(() => {
                    categoryDisplay.classList.remove("selected-animation");
                }, 1000);
            }
        });

        categoriesSection.appendChild(categoryDisplay);
        categoriesSection.appendChild(categoryButton);

        ruleteContainer.appendChild(lettersSection);
        ruleteContainer.appendChild(categoriesSection);

        gameContainer.appendChild(ruleteContainer);
    }

    function loadActorsMode() {
        const gameContainer = document.querySelector(".game-container");
        gameContainer.innerHTML = '';

        let titulo = document.createElement('h1');
        titulo.style.textAlign = 'center';
        titulo.textContent = "Modo Cadena de Actores 🎭";
        gameContainer.appendChild(titulo);

        let actorContainer = document.createElement('div');
        actorContainer.style.textAlign = 'center';
        actorContainer.style.marginTop = '20px';
        
        let actorName = document.createElement('div');
        let selectActor = JSON.parse(localStorage.getItem('currentActor'));
        
        actorName.classList.add('actors-display');
        actorName.textContent = selectActor.nombre;
        actorContainer.appendChild(actorName);

        let btnChangeActor = document.createElement('button');
        btnChangeActor.textContent = "🔄 Cambiar Actor";
        btnChangeActor.style.marginTop = '10px';
        btnChangeActor.classList.add('change-btn');
        btnChangeActor.addEventListener('click', () => {
            obtenerActor('actores');
            selectActor = JSON.parse(localStorage.getItem('currentActor'));
            actorName.textContent = selectActor.nombre;
        });
        actorContainer.appendChild(document.createElement('br'));
        actorContainer.appendChild(btnChangeActor);

        gameContainer.appendChild(actorContainer);

        let subtitulo = document.createElement('h3');
        subtitulo.textContent = "Jugadores en la ronda:";
        subtitulo.style.marginTop = "45px";
        gameContainer.appendChild(subtitulo);

        let playersContainer = document.createElement('div');
        playersContainer.style.marginTop = '10px';
        playersContainer.style.textAlign = 'center';
        playersContainer.classList.add('players-status');

        let jugadoresActivos = JSON.parse(localStorage.getItem('players'));

        jugadoresActivos.forEach(jugador => {
            let divPlayer = document.createElement('div');
            divPlayer.classList.add('player');

            let divName = document.createElement('div');
            divName.classList.add('player-name');
            divName.textContent = jugador;

            let btnRendirse = document.createElement('button');
            btnRendirse.textContent = "Rendirse 🚪";
            btnRendirse.classList.add('giveup-btn');
            btnRendirse.addEventListener('click', () => {
                divPlayer.remove();
                jugadoresActivos = jugadoresActivos.filter(j => j !== jugador);

                if (jugadoresActivos.length === 1) {
                    mostrarGanador(jugadoresActivos[0]);
                }
            });

            divPlayer.appendChild(divName);
            divPlayer.appendChild(btnRendirse);
            playersContainer.appendChild(divPlayer);
        });

        gameContainer.appendChild(playersContainer);

        function mostrarGanador(ganador) {
            gameContainer.innerHTML = `
            <h1 style="text-align:center; color:green;">🏆 ¡${ganador} es el ganador!</h1>
        `;
        }
    }

});
