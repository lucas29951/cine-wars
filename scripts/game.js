document.addEventListener('DOMContentLoaded', () => {
    let gameMode = localStorage.getItem('selectedMode');

    switch (gameMode) {
        case 'classic':
            loadClassicMode();
            break;
        case 'rulete':
            loadRuleteMode();
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
            // currentPlayer.points += 10; // Supongamos que cada respuesta correcta suma 10 puntos
            localStorage.setItem('players', JSON.stringify(players));
            nextTurn(currentTurn, players, currentRound, totalRounds);
        });

        updateGameScreen(currentPlayerElement, currentPlayer, questionElement, currentQuestion);
        startTimer(60);
    }

    function loadRuleteMode() {
        const gameContainer = document.querySelector(".game-container");
        gameContainer.innerHTML = ""; // Limpiar contenido actual

        // Contenedor principal del modo ruleta
        const ruleteContainer = document.createElement("div");
        ruleteContainer.classList.add("rulete-container");

        // === SECCIÓN DE LETRAS ===
        const lettersSection = document.createElement("div");
        lettersSection.classList.add("rulete-section");
        
        const letterDisplay = document.createElement("div");
        letterDisplay.classList.add("rulete-display");
        letterDisplay.classList.add("letters");
        letterDisplay.textContent = "A"; // Valor inicial

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
                letterButton.classList.replace('init','end')
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

        // === SECCIÓN DE CATEGORÍAS ===
        const categoriesSection = document.createElement("div");
        categoriesSection.classList.add("rulete-section");
        
        const categoryDisplay = document.createElement("div");
        categoryDisplay.classList.add("rulete-display");
        categoryDisplay.classList.add("categories");
        categoryDisplay.textContent = "Categoría"; // Valor inicial

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

        // Agregar secciones al contenedor principal
        ruleteContainer.appendChild(lettersSection);
        ruleteContainer.appendChild(categoriesSection);

        // Insertar todo en el gameContainer
        gameContainer.appendChild(ruleteContainer);
    }

});
