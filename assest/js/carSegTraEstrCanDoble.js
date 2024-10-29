// Función para el cálculo de capacidad de estrobo
function calcularCapacidad() {
  // Obtenemos los valores del campo del formulario
  const capacidadInput = document.getElementById("capacidad").value;
  const capacidad = parseCapacidad(capacidadInput);
  const tipoAmarre = document.getElementById("amarre").value;

  // Validar los valores ingresados
  if (isNaN(capacidad)) {
    mostrarError("capacidadError", "Por favor, ingresa un valor numérico válido.");
    return;
  }

  // Si no hay errores, ocultar los mensajes de error
  ocultarError("capacidadError");

  // Calculamos la capacidad según su tipo de amarre
  let resultado;
  if (tipoAmarre === "lazo") {
    resultado = capacidad * capacidad * 9.72 * 0.75;
  } else if (tipoAmarre === "canasta") {
    resultado = capacidad * capacidad * 9.72 * 2;
  } else {
    resultado = capacidad * capacidad * 9.72;
  }

  // Mostramos los resultados en pantalla
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

// Función para calcular la capacidad segura de trabajo en estrobos de canasta vertical doble
function capacidadSeguraVerticalDoble() {
  // Obtenemos los valores de los campos del formulario
  let capacidadAxialDoble = parseFloat(document.getElementById("doble").value);

  // Validar los valores ingresados
  if (isNaN(capacidadAxialDoble)) {
    mostrarError("dobleError", "Por favor, ingresa un valor numérico válido.");
    return;
  }

  // Si no hay errores, ocultar los mensajes de error
  ocultarError("dobleError");

  // Realizar el cálculo
  const capacidadSeguraDoble = capacidadAxialDoble * 4;

  // Mostramos el resultado en pantalla
  document.getElementById("capacidadSeguraEstroboVerticalDoble").innerHTML =
    capacidadSeguraDoble.toFixed(1) + " Ton";

  // Mostramos el proceso y fórmulas utilizadas
  mostrarProceso(capacidadAxialDoble, capacidadSeguraDoble);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(capacidadAxialDoble, capacidadSeguraDoble) {
  const procesoDiv = document.getElementById("procesoDoble");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Formula:</h3>
    <p class="formula">Formula = Capacidad * 4</p>
    <p class="formula"> = ${capacidadAxialDoble} * ${4}</p>
    <p class="formula">Capacidad ≈ ${capacidadSeguraDoble.toFixed(2)} Ton</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
  <h3>Process and Formula:</h3>
  <p class="formula">Formula = Capacity * 4</p>
  <p class="formula"> = ${capacidadAxialDoble} * ${4}</p>
  <p class="formula">Capacity ≈ ${capacidadSeguraDoble.toFixed(2)} Ton</p>
    `;
  }
}

// Función para mostrar errores
function mostrarError(campoErrorId, mensaje) {
  // Ocultar los errores en otros campos
  ocultarError("capacidadError");
  ocultarError("dobleError");
  
  // Mostrar el error correspondiente
  const errorElemento = document.getElementById(campoErrorId);
  errorElemento.textContent = mensaje;
  errorElemento.style.color = "red";
}

// Función para ocultar errores
function ocultarError(campoErrorId) {
  const errorElemento = document.getElementById(campoErrorId);
  errorElemento.textContent = "";
  errorElemento.style.color = "initial";
}
