// Función para mostrar mensajes de error
function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.color = "red";
  ocultarImagen();  // Ocultar imagen cuando se muestra un error
}

// Función para ocultar mensajes de error
function ocultarError(elemento) {
  elemento.textContent = "";
  elemento.style.color = "initial";
}

// Función para ocultar el div de la imagen
function ocultarImagen() {
  document.getElementById("imagenProceso").style.display = "none";
}

// Función para calcular la carga lateral
function calcularCargaLateral() {
  // Obtener valores de los campos de entrada
  const densidadViento = parseFloat(document.getElementById('densidad').value);
  const areaReferencia = parseFloat(document.getElementById('area').value);
  const coeficienteArrastre = parseFloat(document.getElementById('coeficiente').value);
  const velocidadViento = parseFloat(document.getElementById('velocidad').value);

  // Verificar que se ingresaron valores válidos y mostrar errores
  const errores = [
    { value: densidadViento, elemento: document.getElementById('densidadError'), mensaje: "Por favor, ingresa un valor numérico válido." },
    { value: areaReferencia, elemento: document.getElementById('areaError'), mensaje: "Por favor, ingresa un valor numérico válido." },
    { value: coeficienteArrastre, elemento: document.getElementById('coeficienteError'), mensaje: "Por favor, ingresa un valor numérico válido." },
    { value: velocidadViento, elemento: document.getElementById('velocidadError'), mensaje: "Por favor, ingresa un valor numérico válido." }
  ];

  for (const { value, elemento, mensaje } of errores) {
    if (isNaN(value)) {
      mostrarError(elemento, mensaje);
      return;
    }
    ocultarError(elemento);
  }

  // Calcular la carga lateral
  const cargaLateral = 0.5 * densidadViento * areaReferencia * coeficienteArrastre * Math.pow(velocidadViento, 2);

  // Mostrar el resultado
  document.getElementById('result').innerText = cargaLateral.toFixed(2) + " libras";

  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(densidadViento, areaReferencia, coeficienteArrastre, velocidadViento, cargaLateral);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(densidadViento, areaReferencia, coeficienteArrastre, velocidadViento, cargaLateral) {
  const procesoDiv = document.getElementById("procesoLateral");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmulas:</h3>
    <p class="formula">Fórmula = 0.5 * Densidad Viento * Área Referencia * Coeficiente Arrastre * Velocidad Viento<sup>2</sup></p>
    <p class="formula">= 0.5 * ${densidadViento} * ${areaReferencia} * ${coeficienteArrastre} * ${velocidadViento}</p>
    <p class="formula">Carga ≈ ${cargaLateral.toFixed(2)} libras</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formulas:</h3>
    <p class="formula">Formula = 0.5 * Wind Density * Reference Area * Drag Coefficient * Wind Speed<sup>2</sup></p>
    <p class="formula">= 0.5 * ${densidadViento} * ${areaReferencia} * ${coeficienteArrastre} * ${velocidadViento}</p>
    <p class="formula">Load ≈ ${cargaLateral.toFixed(2)} pounds</p>
    `;
  }
}


 
