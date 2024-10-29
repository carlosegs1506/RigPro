// Función para mostrar un error en un elemento
function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.color = "red";
}

// Función para ocultar el error en un elemento
function ocultarError(elemento) {
  elemento.textContent = "";
  elemento.style.color = "initial";
}

// Función para validar un valor numérico
function validarValor(valor, elementoError, mensajeError) {
  if (isNaN(valor)) {
    mostrarError(elementoError, mensajeError);
    return false;
  }
  ocultarError(elementoError);
  return true;
}

// Función para calcular la ráfaga de viento
function calcularRafaga() {
  // Obtenemos valores de los campos de entrada
  const viento10m = parseFloat(document.getElementById('viento').value);
  const alturaTrabajo = parseFloat(document.getElementById('altura').value);
  const vientoError = document.getElementById("vientoError");
  const alturaError = document.getElementById("alturaError");

  // Verificar que se ingresaron valores válidos
  if (!validarValor(viento10m, vientoError, "Por favor, ingresa un valor numérico válido.")) return;
  if (!validarValor(alturaTrabajo, alturaError, "Por favor, ingresa un valor numérico válido.")) return;

  // Definir factores de velocidad según la altura de trabajo
  const factoresVelocidad = {
    10: 1.000,
    20: 1.073,
    30: 1.119,
    40: 1.153,
    50: 1.181,
    60: 1.204,
    70: 1.224,
    80: 1.241,
    90: 1.257,
    100: 1.272,
    110: 1.285,
    120: 1.297,
    130: 1.309,
    140: 1.329,
    150: 1.329,
    160: 1.339,
    170: 1.348,
    180: 1.356,
    190: 1.364,
    200: 1.372
  };

  // Obtener el factor de velocidad correspondiente a la altura de trabajo
  const factorVelocidad = factoresVelocidad[alturaTrabajo] || 1.000;

  // Calcular la velocidad de la ráfaga de viento
  const velocidadRafaga = viento10m * factorVelocidad;

  // Mostrar el resultado
  document.getElementById('result').innerText = velocidadRafaga.toFixed(2) + " m/s";

  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(viento10m, factorVelocidad, velocidadRafaga);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(viento10m, factorVelocidad, velocidadRafaga) {
  const procesoDiv = document.getElementById("procesoViento");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmulas:</h3>
    <p class="formula">Fórmula = Velocidad Viento * Factor Velocidad</p>
    <p class="formula"> = ${viento10m} * ${factorVelocidad}</p>
    <p class="formula">Ráfaga de viento ≈ ${velocidadRafaga.toFixed(2)} m/s</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formulas:</h3>
    <p class="formula">Formula = Wind Speed * Speed Factor</p>
    <p class="formula"> = ${viento10m} * ${factorVelocidad}</p>
    <p class="formula">Wind Gust ≈ ${velocidadRafaga.toFixed(2)} m/s</p>
    `;
  }
}