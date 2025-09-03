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
            loadActorsMode();
            break;
        case 'triada':
            initTresPistasMode();
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

    // ---- UI base (siempre visible) ----
    const titulo = document.createElement('h1');
    titulo.style.textAlign = 'center';
    titulo.textContent = "Modo Cadena de Actores 🎭";
    gameContainer.appendChild(titulo);

    const actorContainer = document.createElement('div');
    actorContainer.style.textAlign = 'center';
    actorContainer.style.marginTop = '20px';

    const actorName = document.createElement('div');
    actorName.classList.add('actors-display'); // caja del actor
    actorContainer.appendChild(actorName);

    // Spinner inicial
    actorName.innerHTML = '';
    actorName.appendChild(createSpinner());

    const btnChangeActor = document.createElement('button');
    btnChangeActor.textContent = "🔄 Cambiar Actor";
    btnChangeActor.style.marginTop = '10px';
    btnChangeActor.classList.add('change-btn');
    btnChangeActor.disabled = true; // se habilita cuando haya actor
    actorContainer.appendChild(document.createElement('br'));
    actorContainer.appendChild(btnChangeActor);

    gameContainer.appendChild(actorContainer);

    const subtitulo = document.createElement('h3');
    subtitulo.textContent = "Jugadores en la ronda:";
    subtitulo.style.marginTop = "45px";
    gameContainer.appendChild(subtitulo);

    const playersContainer = document.createElement('div');
    playersContainer.style.marginTop = '10px';
    playersContainer.style.textAlign = 'center';
    playersContainer.classList.add('players-status');

    let jugadoresActivos = JSON.parse(localStorage.getItem('players')) || [];
    if (!Array.isArray(jugadoresActivos)) {
        // Si viniera como [{name:"..."}, ...] lo normalizamos a solo nombres
        jugadoresActivos = jugadoresActivos.map(j => j?.name ?? j).filter(Boolean);
    }

    jugadoresActivos.forEach(jugador => {
        const divPlayer = document.createElement('div');
        divPlayer.classList.add('player');

        const divName = document.createElement('div');
        divName.classList.add('player-name');
        divName.textContent = jugador;

        const btnRendirse = document.createElement('button');
        btnRendirse.textContent = "Rendirse 🚪";
        btnRendirse.classList.add('giveup-btn');
        btnRendirse.addEventListener('click', () => {
            divPlayer.remove();
            jugadoresActivos = jugadoresActivos.filter(j => j !== jugador);

            obtenerActor("actores");
            let nuevoActor = JSON.parse(localStorage.getItem('currentActor'));
            actorName.textContent = nuevoActor.nombre;

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

    // ---- Lógica de carga/actualización del actor ----
    // Si no está listo, lo pedimos (por si el setup no terminó)
    const estado = localStorage.getItem("estado");
    if (estado !== "listo") {
        localStorage.setItem("estado", "cargando");
        if (typeof obtenerActor === 'function') {
            obtenerActor('actores'); // tu función que hace fetch y setea currentActor + estado="listo"
        }
    }

    // Esperamos a que esté listo y lo mostramos
    waitForActor(8000)
        .then(actor => {
            setActor(actorName, actor);
            btnChangeActor.disabled = false;
        })
        .catch(() => {
            actorName.textContent = "No se pudo cargar el actor. Toca 'Cambiar Actor' para reintentar.";
            btnChangeActor.disabled = false;
        });

    // Cambiar actor (mismo patrón: spinner + esperar)
    btnChangeActor.addEventListener('click', async () => {
        btnChangeActor.disabled = true;
        actorName.innerHTML = '';
        actorName.appendChild(createSpinner());
        localStorage.setItem("estado", "cargando");
        if (typeof obtenerActor === 'function') obtenerActor('actores');

        try {
            const actor = await waitForActor(8000);
            setActor(actorName, actor);
        } catch (e) {
            actorName.textContent = "Error al cargar actor. Intenta nuevamente.";
        } finally {
            btnChangeActor.disabled = false;
        }
    });
}

// Helpers
function createSpinner() {
    const sp = document.createElement('div');
    sp.className = 'spinner';
    return sp;
}

function waitForActor(timeoutMs = 8000) {
    return new Promise((resolve, reject) => {
        const started = Date.now();
        const id = setInterval(() => {
            if (localStorage.getItem("estado") === "listo") {
                clearInterval(id);
                try {
                    const actor = JSON.parse(localStorage.getItem("currentActor"));
                    return resolve(actor);
                } catch (e) {
                    return reject(e);
                }
            }
            if (Date.now() - started > timeoutMs) {
                clearInterval(id);
                return reject(new Error("timeout"));
            }
        }, 150);
    });
}

function setActor(el, actor) {
    // Ajusta según la forma en que guardes el objeto actor
    const nombre = actor?.nombre || actor?.name || "Actor desconocido";
    el.textContent = nombre;
}

// === MODO TRES PISTAS ===
async function initTresPistasMode() {
    const gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML = "";

    let titulo = document.createElement("h1");
    titulo.style.textAlign = "center";
    titulo.textContent = "🎬 Modo Tres Pistas";
    gameContainer.appendChild(titulo);

    let instrucciones = document.createElement("p");
    instrucciones.style.textAlign = "center";
    instrucciones.textContent = "La IA ha elegido una película. ¡Descúbrela con las 3 pistas!";
    gameContainer.appendChild(instrucciones);

    // Contenedor de pistas
    let pistasContainer = document.createElement("div");
    pistasContainer.classList.add("pistas-container");
    pistasContainer.style.textAlign = "center";
    pistasContainer.style.marginTop = "20px";
    gameContainer.appendChild(pistasContainer);

    // Input para adivinar
    let inputGuess = document.createElement("input");
    inputGuess.type = "text";
    inputGuess.placeholder = "Escribe tu respuesta...";
    inputGuess.classList.add("guess-input");
    inputGuess.style.marginTop = "20px";

    let btnGuess = document.createElement("button");
    btnGuess.textContent = "Adivinar 🎯";
    btnGuess.classList.add("guess-btn");

    gameContainer.appendChild(inputGuess);
    gameContainer.appendChild(btnGuess);

    // Obtenemos la película y pistas desde Cohere
    const data = await obtenerPeliculaYPistas();
    const peliculaCorrecta = data.pelicula;
    const pistas = data.pistas; // array con 3 pistas en orden

    let pistaIndex = 0;

    // Mostrar la primera pista
    mostrarPista();

    function mostrarPista() {
        if (pistaIndex < pistas.length) {
            let pistaDiv = document.createElement("div");
            pistaDiv.classList.add("pista");
            pistaDiv.textContent = `Pista ${pistaIndex + 1}: ${pistas[pistaIndex]}`;
            pistasContainer.appendChild(pistaDiv);
            pistaIndex++;
        }
    }

    btnGuess.addEventListener("click", () => {
        let respuesta = inputGuess.value.trim().toLowerCase();
        if (!respuesta) return;

        if (respuesta.includes(peliculaCorrecta.toLowerCase())) {
            gameContainer.innerHTML = `
                <h1 style="text-align:center; color:green;">🎉 ¡Correcto! La película era: ${peliculaCorrecta}</h1>
            `;
        } else {
            inputGuess.value = "";
            if (pistaIndex < pistas.length) {
                mostrarPista();
            } else {
                gameContainer.innerHTML = `
                    <h1 style="text-align:center; color:red;">❌ Has perdido. La película era: ${peliculaCorrecta}</h1>
                `;
            }
        }
    });
}

// === FUNCIÓN PARA USAR LA API DE COHERE ===
async function obtenerPeliculaYPistas() {
    try {
        const response = await fetch("https://api.cohere.ai/v1/generate", {
            method: "POST",
            headers: {
                "Authorization": "Bearer XXXX-XXXX", // <-- Aquí tu API KEY
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "command-r-plus", // modelo de Cohere
                prompt: `Elige una película conocida y proporciona en JSON el siguiente formato:
{
  "pelicula": "Nombre de la película",
  "pistas": [
    "Año de estreno",
    "Género de la película",
    "Nombre de uno o dos actores principales"
  ]
}`,
                max_tokens: 100,
                temperature: 0.8
            })
        });

        const data = await response.json();
        console.log("IA DATA: ", data);
        const texto = data.generations[0].text.trim();

        // Intentamos parsear el JSON que devolvió la IA
        const parsed = JSON.parse(texto);
        return parsed;

    } catch (error) {
        console.error("Error al obtener película de Cohere:", error);
        return {
            pelicula: "Inception",
            pistas: ["2010", "Ciencia Ficción", "Leonardo DiCaprio, Joseph Gordon-Levitt"]
        };
    }
}


});
