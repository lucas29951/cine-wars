
document.addEventListener('DOMContentLoaded', () => {
    const partidas = JSON.parse(localStorage.getItem('partidas')) || [];
    const selectedMode = localStorage.getItem('selectedMode');
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const totalRounds = parseInt(localStorage.getItem('totalRounds')) || 12;
    const currentTurn = parseInt(localStorage.getItem('currentTurn')) || 1;
    const currentRound = parseInt(localStorage.getItem('currentRound')) || 1;
    
    if (currentRound <= (totalRounds / 2)) {
    obtenerConsigna("consignas");
    
    renderPlayersStatus(players);
    renderTurnsBar(totalRounds, currentRound);

    const continueBtn = document.getElementById('continue-btn');
    continueBtn.textContent = currentRound === 1 ? 'Empezar' : 'Continuar';
    
    continueBtn.addEventListener('click', () => {
        if (currentRound > (totalRounds / 2)) {
            startTurn(0);
        } else {
            startTurn(currentTurn);
        }
    });
    } else {
        const statusContainer = document.querySelector('.game-status-container');
        statusContainer.innerHTML = "";
        let titulo = document.createElement('div');
        titulo.textContent = "FIN DEL JUEGO";
        titulo.style.fontSize = "50px";
        titulo.style.fontWeight = 900;
        titulo.style.textAlign = 'center';
        statusContainer.appendChild(titulo);
        let ganador = document.createElement('div')
        ganador.style.fontSize = "30px";
        ganador.style.fontWeight = 700;
        ganador.textContent = players[0].points > players[1].points ? 'Ganador: ' + players[0].name : 'Ganador: ' + players[1].name;
        statusContainer.appendChild(ganador);

        partidas.push({ jugadores: players, modo: selectedMode });
        //playerNames.push({ name: input.value.trim(), points: 0 });
        localStorage.setItem('partidas', JSON.stringify(partidas));
        // alert('Juego Terminado!'); // Aqui podemos redirigir a una pagina donde se muestren los resultados
    }
});
