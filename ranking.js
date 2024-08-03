document.addEventListener('DOMContentLoaded', () => {
    const rankingBody = document.getElementById('ranking-body');
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
        const row = document.createElement('tr');
        const positionCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const pointsCell = document.createElement('td');

        positionCell.textContent = index + 1;
        nameCell.textContent = player.name;
        pointsCell.textContent = player.points;

        row.appendChild(positionCell);
        row.appendChild(nameCell);
        row.appendChild(pointsCell);

        rankingBody.appendChild(row);
    });
});

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
        default:
            alert('Página no encontrada');
            break;
    }
}
