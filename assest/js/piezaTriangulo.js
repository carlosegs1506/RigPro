// Función para calcular el peso de una pieza triangular
function calcularPesoTriangulo() {
    // Obtenemos los valores de los campos del formulario
    const altoInput = document.getElementById("alto");
    const anchoInput = document.getElementById("ancho");
    const espesorInput = document.getElementById("espesor");
    const pesoEspecificoInput = document.getElementById("pesoEspecifico");

    const alto = parseFloat(altoInput.value);
    const ancho = parseFloat(anchoInput.value);
    const espesor = parseFloat(espesorInput.value);
    const pesoEspecifico = parseFloat(pesoEspecificoInput.value);

    // Obtenemos los elementos de error
    const altoError = document.getElementById("altoError");
    const anchoError = document.getElementById("anchoError");
    const espesorError = document.getElementById("espesorError");
    const pesoEspecificoError = document.getElementById("pesoEspecificoError");

    // Validamos los valores ingresados
    if (isNaN(alto)) {
        mostrarError(altoError, "Por favor, ingresa un valor numérico válido.");
        return;
    }
    if (isNaN(ancho)) {
        mostrarError(anchoError, "Por favor, ingresa un valor numérico válido.");
        return;
    }
    if (isNaN(espesor)) {
        mostrarError(espesorError, "Por favor, ingresa un valor numérico válido.");
        return;
    }
    if (isNaN(pesoEspecifico)) {
        mostrarError(pesoEspecificoError, "Por favor, ingresa un valor numérico válido.");
        return;
    }

    // Ocultamos los mensajes de error si no hay errores
    ocultarError(altoError);
    ocultarError(anchoError);
    ocultarError(espesorError);
    ocultarError(pesoEspecificoError);

    // Calculamos el peso del rectángulo
    const pesoRectangulo = alto * ancho * espesor * pesoEspecifico;

    // Calculamos el peso del triángulo
    const pesoTriangulo = pesoRectangulo / 2;

    // Mostramos los resultados en la página
    document.getElementById("pesoRectanguloResultado").innerText = `${pesoRectangulo.toFixed(3)} Toneladas Métricas`;
    document.getElementById("pesoTrianguloResultado").innerText = `${pesoTriangulo.toFixed(3)} Toneladas Métricas`;

    // Mostrar el proceso y fórmulas utilizadas
    mostrarProceso(alto, ancho, espesor, pesoEspecifico, pesoRectangulo, pesoTriangulo);
    mostrarImagen();
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(alto, ancho, espesor, pesoEspecifico, pesoRectangulo, pesoTriangulo) {
    const procesoDiv = document.getElementById("procesoTriangulo");
    
    // Detectar el idioma de la página
    const lang = document.documentElement.lang;
  
    if (lang === "es") {
      // Texto en español
      procesoDiv.innerHTML = `
        <h3>Proceso y Fórmulas:</h3>
        <p class="formula">Peso del Rectángulo = Alto * Ancho * Espesor * Peso Específico</p>
        <p class="formula"> = ${alto} * ${ancho} * ${espesor} * ${pesoEspecifico}</p>
        <p class="formula"> = ${pesoRectangulo.toFixed(3)} Toneladas Métricas</p>
        <p class="formula">Peso del Triángulo = Peso del Rectángulo / 2</p>
        <p class="formula"> = ${pesoRectangulo.toFixed(3)} / 2</p>
        <p class="formula"> ≈ ${pesoTriangulo.toFixed(3)} Toneladas Métricas</p>
      `;
    } else if (lang === "en") {
      // Texto en inglés
      procesoDiv.innerHTML = `
        <h3>Process and Formulas:</h3>
        <p class="formula">Weight of the Rectangle = Height * Width * Thickness * Specific Weight</p>
        <p class="formula"> = ${alto} * ${ancho} * ${espesor} * ${pesoEspecifico}</p>
        <p class="formula"> = ${pesoRectangulo.toFixed(3)} Metric Tons</p>
        <p class="formula">Weight of the Triangle = Weight of the Rectangle / 2</p>
        <p class="formula"> = ${pesoRectangulo.toFixed(3)} / 2</p>
        <p class="formula"> ≈ ${pesoTriangulo.toFixed(3)} Metric Tons</p>
      `;
    }
  
    // Mostrar el div de la imagen
    document.getElementById("imagenProceso").style.display = "block";
  }

// Función para mostrar el div de la imagen
function mostrarImagen() {
    document.getElementById("imagenProceso").style.display = "block";
}

// Función para ocultar el div de la imagen
function ocultarImagen() {
    document.getElementById("imagenProceso").style.display = "none";
}

// Función para mostrar error
function mostrarError(elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.color = "red";
}

// Función para ocultar error
function ocultarError(elemento) {
    elemento.textContent = "";
    elemento.style.color = "initial";
}

// Eventos para validar los campos antes de calcular
document.getElementById("alto").addEventListener("input", () => {
    const alto = parseFloat(document.getElementById("alto").value);
    const altoError = document.getElementById("altoError");

    if (isNaN(alto)) {
        mostrarError(altoError, "Por favor, ingresa un valor numérico válido.");
    } else {
        ocultarError(altoError);
    }
});

document.getElementById("ancho").addEventListener("input", () => {
    const ancho = parseFloat(document.getElementById("ancho").value);
    const anchoError = document.getElementById("anchoError");

    if (isNaN(ancho)) {
        mostrarError(anchoError, "Por favor, ingresa un valor numérico válido.");
    } else {
        ocultarError(anchoError);
    }
});

document.getElementById("espesor").addEventListener("input", () => {
    const espesor = parseFloat(document.getElementById("espesor").value);
    const espesorError = document.getElementById("espesorError");

    if (isNaN(espesor)) {
        mostrarError(espesorError, "Por favor, ingresa un valor numérico válido.");
    } else {
        ocultarError(espesorError);
    }
});

document.getElementById("pesoEspecifico").addEventListener("input", () => {
    const pesoEspecifico = parseFloat(document.getElementById("pesoEspecifico").value);
    const pesoEspecificoError = document.getElementById("pesoEspecificoError");

    if (isNaN(pesoEspecifico)) {
        mostrarError(pesoEspecificoError, "Por favor, ingresa un valor numérico válido.");
    } else {
        ocultarError(pesoEspecificoError);
    }
});
