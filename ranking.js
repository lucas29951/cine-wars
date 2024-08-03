document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.ranking-list');
    const partidas = JSON.parse(localStorage.getItem('partidas')) || [];

    const allPlayers = [];

    partidas.forEach(partida => {
        partida.jugadores.forEach(jugador => {
            const existingPlayer = allPlayers.find(p => p.name === jugador.name);
            if (existingPlayer) {
                existingPlayer.points += jugador.points;
            } else {
                allPlayers.push({ name: jugador.name, points: jugador.points });
            }
        });
    });

    allPlayers.sort((a, b) => b.points - a.points);

    allPlayers.forEach((player, index) => {
        let item = document.createElement('div');
        item.classList.add('ranking-item');

        let image = document.createElement('img');
        image.src = "https://api.dicebear.com/9.x/pixel-art/svg?seed=Karl&backgroundType=gradientLinear&backgroundColor=c0aede,d1d4f9,b6e3f4,ffd5dc,ffdfbf";
        image.alt = `Player N${index + 1}`;
        item.appendChild(image);

        let info = document.createElement('div');
        info.classList.add('ranking-info');

        let nombre = document.createElement('div');
        let puntaje = document.createElement('div');

        nombre.textContent = player.name;
        puntaje.textContent = player.points;
        
        info.appendChild(nombre);
        info.appendChild(puntaje);

        item.appendChild(info);

        container.appendChild(item);
    });
});

