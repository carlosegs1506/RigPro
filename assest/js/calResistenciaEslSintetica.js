// Ejecutamos la función cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
    // Asignamos el evento al botón cuando el DOM está listo
    document.querySelector(".enviar").addEventListener("click", calcularResistenciaEslinga);
});

function calcularResistenciaEslinga() {
    let largoEslingaImput = document.getElementById("largo");
    let anchoEslingaImput  = document.getElementById("ancho");
    let numeroCapasImput  = document.getElementById("numero_capas");
    let fuerzaEslingaImput  = document.getElementById("fuerza");
    let segundosEslingasImput  = document.getElementById("segundos");

    let largoEslinga = parseFloat(largoEslingaImput.value);
    let anchoEslinga = parseFloat(anchoEslingaImput.value);
    let numeroCapas = parseFloat(numeroCapasImput.value);
    let fuerzaEslinga = parseFloat(fuerzaEslingaImput.value);
    let segundosEslinga = parseFloat(segundosEslingasImput.value);

    // Validar los valores ingresados
    const campos = [
        { valor: largoEslinga, errorId: 'largoError', nombre: 'largo' },
        { valor: anchoEslinga, errorId: 'anchoError', nombre: 'ancho' },
        { valor: numeroCapas, errorId: 'numero_capasError', nombre: 'numero_capas' },
        { valor: fuerzaEslinga, errorId: 'fuerzaError', nombre: 'fuerza' },
        { valor: segundosEslinga, errorId: 'segundosError', nombre: 'segundos' }
    ];

    let validacionExitosa = true;

    for (let campo of campos) {
        if (isNaN(campo.valor)) {
            mostrarError(campo.errorId, "Por favor, ingresa un valor numérico válido.");
            validacionExitosa = false;
        } else {
            ocultarError(campo.errorId);
        }
    }
    
    if (!validacionExitosa) return;

    // Realizar el cálculo
    const resistenciaEslingaSintetica = largoEslinga * anchoEslinga * numeroCapas * (fuerzaEslinga / segundosEslinga);

    //Mostrar el resultado en pantalla
    document.getElementById("resistenciaEslinga").innerHTML = resistenciaEslingaSintetica.toFixed(2) + " Ton | Kg según corresponda";

    // Mostrar el proceso y fórmulas utilizadas
    mostrarProceso(largoEslinga, anchoEslinga, numeroCapas, fuerzaEslinga, segundosEslinga, resistenciaEslingaSintetica);
}

function mostrarProceso(largoEslinga, anchoEslinga, numeroCapas, fuerzaEslinga, segundosEslinga, resistenciaEslingaSintetica) {
    const procesoDiv = document.getElementById("procesoResistencia");

    const lang = document.documentElement.lang;

    if (lang === "es") {
        procesoDiv.innerHTML = `
            <h3>Proceso y Fórmulas:</h3>
            <p class="formula">Fórmula = Largo Eslinga * Ancho Eslinga * Numero de Capas * Fuerza / Segundos</p>
            <p class="formula"> = (${largoEslinga} * ${anchoEslinga} * ${numeroCapas} * (${fuerzaEslinga} 
            / ${segundosEslinga})</p>
            <p class="formula">Altura ≈ ${resistenciaEslingaSintetica.toFixed(2)} Ton | Kg segun corresponda</p>
        `;
    } else if (lang === "en") {
        procesoDiv.innerHTML = `
            <h3>Process and Formulas:</h3>
            <p class="formula">Formula = Sling Length * Sling Width * Number of Layers * Force / Seconds</p>
            <p class="formula"> = (${largoEslinga} * ${anchoEslinga} * ${numeroCapas} * (${fuerzaEslinga} 
            / ${segundosEslinga})</p>
            <p class="formula">Height ≈ ${resistenciaEslingaSintetica.toFixed(2)} Ton | Kg segun corresponda</p>
        `;
    }
}

function mostrarError(idElemento, mensaje) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.color = "red";
    } else {
        console.warn(`Elemento con ID "${idElemento}" no encontrado.`);
    }
}

function ocultarError(idElemento) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = "";
        elemento.style.color = "initial";
    } else {
        console.warn(`Elemento con ID "${idElemento}" no encontrado.`);
    }
}

