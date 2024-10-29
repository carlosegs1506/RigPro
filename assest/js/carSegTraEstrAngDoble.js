// Función para calcular la capacidad de estrobo
function calcularCapacidad() {
  // Obtener los valores del campo del formulario
  const capacidadInput = document.getElementById("capacidad").value;
  const capacidad = parseCapacidad(capacidadInput);
  const tipoAmarre = document.getElementById("amarre").value;

  // Validar el primer campo
  if (isNaN(capacidad)) {
    mostrarError(document.getElementById("capacidadError"), "Por favor, ingresa un valor numérico válido.");
    ocultarError(document.getElementById("resultado")); // Ocultar resultado si hay error
    return;
  } else {
    ocultarError(document.getElementById("capacidadError"));
  }

  // Calcular la capacidad según su tipo de amarre
  let resultado;
  if (tipoAmarre === "lazo") {
    resultado = capacidad * capacidad * 9.72 * 0.75;
  } else if (tipoAmarre === "canasta") {
    resultado = capacidad * capacidad * 9.72 * 2;
  } else {
    resultado = capacidad * capacidad * 9.72;
  }

  // Mostrar los resultados en pantalla
  document.getElementById("resultado").innerText = `${resultado.toFixed(2)} Ton`;
}

// Función para parsear la capacidad
function parseCapacidad(capacidadInput) {
  try {
    // Intentamos evaluar la expresión para admitir cualquier formato numérico o fraccional
    return eval(capacidadInput);
  } catch (error) {
    return null;
  }
}

// Función para calcular la capacidad segura de trabajo en estrobos de canasta angulada doble
function capacidadSeguraVerticalAnguladaDoble() {
  // Obtener los valores de los campos del formulario
  let doble = parseFloat(document.getElementById("doble").value);
  let altura = parseFloat(document.getElementById("altura").value);
  let largo = parseFloat(document.getElementById("largo").value);

  // Validar el primer campo
  if (isNaN(doble)) {
    mostrarError(document.getElementById("dobleError"), "Por favor, ingresa un valor numérico válido.");
    ocultarError(document.getElementById("capacidadSeguraEstroboAnguladaDoble")); // Ocultar resultado si hay error
    return;
  } else {
    ocultarError(document.getElementById("dobleError"));
  }

  // Validar el segundo campo
  if (isNaN(altura)) {
    mostrarError(document.getElementById("alturaError"), "Por favor, ingresa un valor numérico válido.");
    ocultarError(document.getElementById("capacidadSeguraEstroboAnguladaDoble")); // Ocultar resultado si hay error
    return;
  } else {
    ocultarError(document.getElementById("alturaError"));
  }

  // Validar el tercer campo
  if (isNaN(largo)) {
    mostrarError(document.getElementById("largoError"), "Por favor, ingresa un valor numérico válido.");
    ocultarError(document.getElementById("capacidadSeguraEstroboAnguladaDoble")); // Ocultar resultado si hay error
    return;
  } else {
    ocultarError(document.getElementById("largoError"));
  }

  // Realizar el cálculo
  const capacidadSeguraDoble = ((doble * altura) / largo) * 4;

  // Mostrar el resultado en pantalla
  document.getElementById("capacidadSeguraEstroboAnguladaDoble").innerHTML = `${capacidadSeguraDoble.toFixed(1)} Ton`;

  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(doble, altura, largo, capacidadSeguraDoble);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(doble, altura, largo, capacidadSeguraDoble) {
  const procesoDiv = document.getElementById("procesoDoble");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmulas:</h3>
    <p class="formula">Fórmula = Capacidad * Altura / Largo * 4</p>
    <p class="formula"> = ${doble} * ${altura} / ${largo} * ${4}</p>
    <p class="formula">Capacidad ≈ ${capacidadSeguraDoble.toFixed(2)} Ton</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formulas:</h3>
    <p class="formula">Formula = Capacity * Height / Length * 4</p>
    <p class="formula">= ${doble} * ${altura} / ${largo} * ${4}</p>
    <p class="formula">Capacity ≈ ${capacidadSeguraDoble.toFixed(2)} Ton</p>
    `;
  }
}

// Función para mostrar mensajes de error
function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.color = "red";
}

// Función para ocultar mensajes de error
function ocultarError(elemento) {
  elemento.textContent = "";
  elemento.style.color = "initial";
}
