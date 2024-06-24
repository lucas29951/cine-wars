
async function getApiData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


async function obtenerConsigna(search) {
    const result = await getApiData(api[search]);
    const orden = aleatorio(1, result.length);
    // createCards(result, search);
    cargarConsigna(result[orden - 1]);
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


