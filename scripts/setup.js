document.addEventListener('DOMContentLoaded', () => {
    const gameModeSelect = document.getElementById('game-mode');
    const classicTypeSelect = document.getElementById('classic-type');
    const themeTypeSelected = document.getElementById('theme-type');
    const playerNamesContainer = document.getElementById('player-names');
    const startGameBtn = document.getElementById('start-game-btn');

    handleGameModeChange();
    gameModeSelect.addEventListener('change', handleGameModeChange);
    classicTypeSelect.addEventListener('change', handleClassicTypeChange);
    themeTypeSelected.addEventListener('change', handleThemeTypeChange);
    startGameBtn.addEventListener('click', startGame);

    function handleGameModeChange() {
        // const selectedMode = gameModeSelect.value;
        const selectedMode = localStorage.getItem('selectedMode');
        const classicOptions = document.getElementById('classic-options');
        const themeOptions = document.getElementById('theme-options');

        switch (selectedMode) {
            case "classic":
                classicOptions.style.display = 'block';
                handleClassicTypeChange();
                break;
            case "rulete":
                handleRuleteTypeChange();
                break;
            case "theme":
                themeOptions.style.display = 'block';
                handleThemeTypeChange();
                break;
            case "actors":
                handleActorsTypeChange();
                break;
            case "custom":
                console.log("Modo Personalizado");
                break;
            case "solo":
                console.log("Modo Solitario");
                break;
            default:
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

    function handleRuleteTypeChange() {
        const setupContainer = document.querySelector(".setup-container");
        setupContainer.innerHTML = '';

        let form = document.createElement('form');
        form.id = 'setup-form';

        let titulo = document.createElement('h1');
        titulo.style.textAlign = 'center';
        titulo.textContent = "Modo Ruleta / Rosco 🎡";
        form.appendChild(titulo);

        let descripcion = document.createElement('p');
        descripcion.style.marginTop = '20px';
        descripcion.style.textAlign = 'justify';
        descripcion.style.fontSize = '18px';
        descripcion.style.lineHeight = '1.6';
        descripcion.innerHTML = `
        En este modo de juego tendrás que poner a prueba tu rapidez mental y tu conocimiento 🎬. 
        El juego se compone de dos ruletas interactivas: una con <b>letras</b> del abecedario 🔠 
        y otra con <b>categorías</b> relacionadas al cine, series, actores y más 🎥. <br><br>
        
        🔹 Primero, la <b>ruleta de letras</b> girará mostrando una a una todas las letras. 
        Cuando presiones el botón <i>Detener</i>, la ruleta se parará en una letra seleccionada.  
        🔹 Luego, la <b>ruleta de categorías</b> girará mostrando distintos géneros y temáticas. 
        Al detenerla, se elegirá una categoría. <br><br>
        
        Tu misión será <b>responder correctamente</b> una pregunta o dar un ejemplo que comience 
        con la letra seleccionada y que además pertenezca a la categoría elegida ✅. <br><br>
        
        ⚡ ¡El reto está en ser rápido, ingenioso y creativo para sumar puntos!
    `;
        form.appendChild(descripcion);

        let boton = document.createElement('button');
        boton.type = 'button';
        boton.id = 'start-game-btn';
        boton.textContent = "Iniciar Partida";
        boton.style.margin = '20px auto 40px';

        form.appendChild(boton);

        setupContainer.appendChild(form);

        const btnStart = document.getElementById('start-game-btn');
        btnStart.addEventListener('click', startGameRulete);
    }


    function handleThemeTypeChange() {
        const selectedType = themeTypeSelected.value;
        playerNamesContainer.innerHTML = '';

        switch (selectedType) {
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

    function handleActorsTypeChange() {
        const setupContainer = document.querySelector(".setup-container");
        setupContainer.innerHTML = '';

        let form = document.createElement('form');
        form.id = 'setup-form';

        let titulo = document.createElement('h1');
        titulo.style.textAlign = 'center';
        titulo.textContent = "Modo Cadena de Actores 🎭";
        form.appendChild(titulo);

        let labelCantidad = document.createElement('label');
        labelCantidad.textContent = "Cantidad de jugadores:";
        labelCantidad.style.display = "block";
        labelCantidad.style.marginTop = "20px";

        let inputCantidad = document.createElement('input');
        inputCantidad.type = "number";
        inputCantidad.min = "2";
        inputCantidad.max = "10";
        inputCantidad.placeholder = "Ej: 4";
        inputCantidad.required = true;
        inputCantidad.style.marginTop = "10px";
        inputCantidad.style.display = "block";
        inputCantidad.classList.add('players-count');

        let btnConfirmar = document.createElement('button');
        btnConfirmar.type = "button";
        btnConfirmar.textContent = "Confirmar";
        btnConfirmar.style.margin = "15px auto";
        btnConfirmar.classList.add('confirm-btn');

        form.appendChild(labelCantidad);
        form.appendChild(inputCantidad);
        form.appendChild(btnConfirmar);

        let playersContainer = document.createElement('div');
        playersContainer.id = "players-container";
        playersContainer.style.marginTop = "20px";
        form.appendChild(playersContainer);

        setupContainer.appendChild(form);

        btnConfirmar.addEventListener('click', () => {
            playersContainer.innerHTML = '';

            let cantidad = parseInt(inputCantidad.value);

            if (isNaN(cantidad) || cantidad < 2 || cantidad > 10) {
                alert("Por favor ingresa un número válido entre 2 y 10 jugadores.");
                return;
            }

            for (let i = 1; i <= cantidad; i++) {
                let label = document.createElement('label');
                label.textContent = `Nombre del jugador ${i}:`;
                label.style.display = "block";
                label.style.marginTop = "10px";

                let input = document.createElement('input');
                input.type = "text";
                input.placeholder = `Jugador ${i}`;
                input.required = true;
                input.classList.add("player-name");

                playersContainer.appendChild(label);
                playersContainer.appendChild(input);
            }

            let btnStart = document.createElement('button');
            btnStart.type = "button";
            btnStart.id = 'start-game-btn';
            btnStart.textContent = "Iniciar Partida";
            btnStart.style.marginTop = "20px";
            btnStart.style.display = "block";

            playersContainer.appendChild(btnStart);

            btnStart.addEventListener('click', () => {
                let inputs = document.querySelectorAll('.player-name');
                let players = [];

                inputs.forEach(input => {
                    if (input.value.trim() !== "") {
                        players.push(input.value.trim());
                    }
                });

                if (players.length !== cantidad) {
                    alert("Por favor completa todos los nombres de los jugadores.");
                    return;
                }

                localStorage.setItem("players", JSON.stringify(players));

                window.location.href = "game.html";
            });
        });

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
        const gameMode = localStorage.getItem('selectedMode');
        switch (gameMode) {
            case 'classic':
                startGameClassic();
                break;
            case 'rulete':

                startGameRulete();
                break;
        }
    }

    function startGameClassic() {
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

        window.location.href = 'status.html';
    }

    function startGameRulete() {
        window.location.href = 'game.html';
    }

    function startGameActors() {
        window.location.href = 'status.html';
    }
});
