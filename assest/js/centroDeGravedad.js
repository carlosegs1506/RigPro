// Función para el cálculo del centro de gravedad
document.addEventListener("DOMContentLoaded", function() {
  // Obtenemos los valores de los campos del formulario
  const peso1Input = document.getElementById("peso1");
  const distancia1Input = document.getElementById("distancia_1");
  const peso2Input = document.getElementById("peso2");
  const distancia2Input = document.getElementById("distancia_2");

  peso1Input.addEventListener("input", function() {
    if (!isNaN(parseFloat(peso1Input.value))) {
      ocultarError("peso1Error");
    }
  });

  distancia1Input.addEventListener("input", function() {
    if (!isNaN(parseFloat(distancia1Input.value))) {
      ocultarError("distancia_1Error");
    }
  });

  peso2Input.addEventListener("input", function() {
    if (!isNaN(parseFloat(peso2Input.value))) {
      ocultarError("peso2Error");
    }
  });

  distancia2Input.addEventListener("input", function() {
    if (!isNaN(parseFloat(distancia2Input.value))) {
      ocultarError("distancia_2Error");
    }
  });
});

// Función para el cálculo del centro de gravedad
function calcularCentroGravedad() {
  // Obtenemos los valores de los campos del formulario
  const peso1 = parseFloat(document.getElementById("peso1").value);
  const distancia1 = parseFloat(document.getElementById("distancia_1").value);
  const peso2 = parseFloat(document.getElementById("peso2").value);
  const distancia2 = parseFloat(document.getElementById("distancia_2").value);

  // Ocultar todos los mensajes de error antes de la validación
  ocultarError("peso1Error");
  ocultarError("distancia_1Error");
  ocultarError("peso2Error");
  ocultarError("distancia_2Error");

  // Validar los valores ingresados y mostrar/ocultar errores individualmente
  if (isNaN(peso1)) {
    mostrarError("peso1Error", "Por favor, ingresa un valor numérico válido.");
    return;
  } 

  if (isNaN(distancia1)) {
    mostrarError("distancia_1Error", "Por favor, ingresa un valor numérico válido.");
    return;
  } 

  if (isNaN(peso2)) {
    mostrarError("peso2Error", "Por favor, ingresa un valor numérico válido.");
    return;
  } 

  if (isNaN(distancia2)) {
    mostrarError("distancia_2Error", "Por favor, ingresa un valor numérico válido.");
    return;
  } 

  // Calculamos las variables necesarias
  const momento1 = peso1 * distancia1;
  const momento2 = peso2 * distancia2;
  const pesoTotal = peso1 + peso2;
  const momentoTotal = momento1 + momento2;
  const centroGravedad = momentoTotal / pesoTotal;

  // Mostramos el resultado en la página
  document.getElementById("calcularGravedad").innerHTML = 
    centroGravedad.toFixed(1) + " mts";

  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(momento1, momento2, momentoTotal, pesoTotal, centroGravedad);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(momento1, momento2, momentoTotal, pesoTotal, centroGravedad) {
  const procesoDiv = document.getElementById("procesoGravedad");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmulas:</h3>
    <p class="formula">Paso 1 = Peso 1 * Distancia 1</p>
    <p class="formula">Momento 1 = ${momento1.toFixed(2)} Kg</p><br>
    <p class="formula">Paso 2 = Peso 2 * Distancia 2</p>
    <p class="formula">Momento 2 = ${momento2.toFixed(2)} Kg</p><br>
    <p class="formula">Peso total = Peso 1 + Peso 2 = ${pesoTotal.toFixed(2)}</p><br>
    <p class="formula">Momento total = Momento 1 + Momento 2 = ${momentoTotal.toFixed(2)}</p><br>
    <p class="formula">Centro de Gravedad = Momento Total / Peso Total = ${centroGravedad.toFixed(2)} mts</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
  <h3>Process and Formulas:</h3>
  <p class="formula">Step 1 = Weight 1 * Distance 1</p>
  <p class="formula">Moment 1 = ${momento1.toFixed(2)} Kg</p><br>
  <p class="formula">Step 2 = Weight 2 * Distance 2</p>
  <p class="formula">Moment 2 = ${momento2.toFixed(2)} Kg</p><br>
  <p class="formula">Total Weight = Weight 1 + Weight 2 = ${pesoTotal.toFixed(2)}</p><br>
  <p class="formula">Total Moment = Moment 1 + Moment 2 = ${momentoTotal.toFixed(2)}</p><br>
  <p class="formula">Center of Gravity = Total Moment / Total Weight = ${centroGravedad.toFixed(2)} m</p>
    `;
  }

  // Mostrar el div de la imagen
  const imagenProcesoDiv = document.getElementById("imagenProceso");
  imagenProcesoDiv.style.display = "block";
}

// Función para ocultar el div de la imagen
function ocultarImagen() {
  const imagenProcesoDiv = document.getElementById("imagenProceso");
  imagenProcesoDiv.style.display = "none";
}

// Función para mostrar errores
function mostrarError(campoErrorId, mensaje) {
  // Ocultar el div de la imagen en caso de error
  ocultarImagen();

  // Ocultar todos los mensajes de error
  ocultarError("peso1Error");
  ocultarError("distancia_1Error");
  ocultarError("peso2Error");
  ocultarError("distancia_2Error");

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
