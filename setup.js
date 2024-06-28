document.addEventListener('DOMContentLoaded', () => {
    // const gameModeSelect = document.getElementById('game-mode');
    const classicTypeSelect = document.getElementById('classic-type');
    const themeTypeSelected = document.getElementById('theme-type');
    const playerNamesContainer = document.getElementById('player-names');
    const startGameBtn = document.getElementById('start-game-btn');

    handleGameModeChange();
    // gameModeSelect.addEventListener('change', handleGameModeChange);
    classicTypeSelect.addEventListener('change', handleClassicTypeChange);
    themeTypeSelected.addEventListener('change', handleThemeTypeChange);
    startGameBtn.addEventListener('click', startGame);

    function handleGameModeChange() {
        // const selectedMode = gameModeSelect.value;
        const selectedMode = localStorage.getItem('selectedMode');
        const classicOptions = document.getElementById('classic-options');
        const themeOptions = document.getElementById('theme-options');

        // if (selectedMode === 'classic') {
        //     classicOptions.style.display = 'block';
        //     handleClassicTypeChange();
        // } else {
        //     classicOptions.style.display = 'none';
        //     playerNamesContainer.innerHTML = '';
        // }

        switch (selectedMode) {
            case "classic":
                //console.log("Modo Clasico");
                classicOptions.style.display = 'block';
                handleClassicTypeChange();
                break;
            case "online":
                //console.log("Modo Online");
                handleOnlineTypeChange();
                break;
            case "theme":
                //console.log("Modo Tematico");
                themeOptions.style.display = 'block';
                handleThemeTypeChange();
                break;
            case "deathmatch":
                console.log("Modo Deathmatch");
                break;
            case "custom":
                console.log("Modo Personalizado");
                break;
            case "solo":
                console.log("Modo Solitario");
                break;
            default:
                //console.log("No existe este modo elegido!");
                classicOptions.style.display = 'none';
                themeOptions.style.display = 'none';
                playerNamesContainer.innerHTML = '';
        }

    }

    function handleClassicTypeChange() {
        const selectedType = classicTypeSelect.value;
        playerNamesContainer.innerHTML = '';

        if (selectedType === 'versus') {
            addPlayerInput('Jugador 1');
            addPlayerInput('Jugador 2');
        } else if (selectedType === 'teams') {
            addPlayerInput('Equipo 1');
            addPlayerInput('Equipo 2');
        }
    }

    function addPlayerInput(labelText) {
        const label = document.createElement('label');
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = 'text';
        input.name = labelText.toLowerCase().replace(' ', '-');
        input.placeholder = `Nombre de ${labelText}`;

        playerNamesContainer.appendChild(label);
        playerNamesContainer.appendChild(input);
    }

    function handleOnlineTypeChange() {
        const setupContainer = document.querySelector(".setup-container");
        setupContainer.innerHTML = '';

        let titulo = document.createElement('h1');
        titulo.style.textAlign = 'center';
        titulo.textContent = "Este modo de juego aun no esta disponible!";

        setupContainer.appendChild(titulo);

        let boton = document.createElement('a');
        boton.href = "./index.html";
        boton.style.textAlign = 'center';
        boton.style.textDecoration = 'none';
        let textoBoton = document.createElement('h5');
        textoBoton.textContent = "HOME";
        boton.appendChild(textoBoton);

        setupContainer.appendChild(boton);

    }

    function handleThemeTypeChange() {
        const selectedType = themeTypeSelected.value;
        playerNamesContainer.innerHTML = '';

        switch(selectedType) {
            case "accion":
                alert("Accion");
                break;
            case "comedia":
                alert("Comedia");
                break;
            case "scify":
                alert("Ciencia Ficcion");
                break;
            case "deporte":
                alert("Deporte");
                break;
            case "terror":
                alert("Terror");
                break;
            case "suspenso":
                alert("Suspenso");
                break;
            case "thriller":
                alert("Thriller");
                break;
            case "romance":
                alert("Romance");
                break;
            default:
                alert("No existe este tipo!")
        }
    }

    function handleDeathmatchTypeChange() {
        const selectedType = classicTypeSelect.value;
        playerNamesContainer.innerHTML = '';

        if (selectedType === 'versus') {
            addPlayerInput('Jugador 1');
            addPlayerInput('Jugador 2');
        } else if (selectedType === 'teams') {
            addPlayerInput('Equipo 1');
            addPlayerInput('Equipo 2');
        }
    }

    function handleCustomTypeChange() {
        const selectedType = classicTypeSelect.value;
        playerNamesContainer.innerHTML = '';

        if (selectedType === 'versus') {
            addPlayerInput('Jugador 1');
            addPlayerInput('Jugador 2');
        } else if (selectedType === 'teams') {
            addPlayerInput('Equipo 1');
            addPlayerInput('Equipo 2');
        }
    }

    function handleSoloTypeChange() {
        const selectedType = classicTypeSelect.value;
        playerNamesContainer.innerHTML = '';

        if (selectedType === 'versus') {
            addPlayerInput('Jugador 1');
            addPlayerInput('Jugador 2');
        } else if (selectedType === 'teams') {
            addPlayerInput('Equipo 1');
            addPlayerInput('Equipo 2');
        }
    }

    function startGame() {
        //const gameMode = gameModeSelect.value;
        const playerNames = [];

        const inputs = playerNamesContainer.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.value.trim()) {
                playerNames.push({ name: input.value.trim(), points: 0 });
            }
        });

        if (playerNames.length < 2) {
            alert('Por favor, ingrese los nombres de al menos dos jugadores o equipos.');
            return;
        }

        localStorage.setItem('players', JSON.stringify(playerNames));
        localStorage.setItem('totalRounds', 12);
        localStorage.setItem('currentTurn', 1);
        localStorage.setItem('currentRound', 1);

        window.location.href = './status.html';
    }
});
