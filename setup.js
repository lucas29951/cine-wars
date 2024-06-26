document.addEventListener('DOMContentLoaded', () => {
    const gameModeSelect = document.getElementById('game-mode');
    const classicTypeSelect = document.getElementById('classic-type');
    const playerNamesContainer = document.getElementById('player-names');
    const startGameBtn = document.getElementById('start-game-btn');

    gameModeSelect.addEventListener('change', handleGameModeChange);
    classicTypeSelect.addEventListener('change', handleClassicTypeChange);
    startGameBtn.addEventListener('click', startGame);

    function handleGameModeChange() {
        const selectedMode = gameModeSelect.value;
        const classicOptions = document.getElementById('classic-options');

        if (selectedMode === 'classic') {
            classicOptions.style.display = 'block';
            handleClassicTypeChange();
        } else {
            classicOptions.style.display = 'none';
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

    function startGame() {
        const gameMode = gameModeSelect.value;
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
