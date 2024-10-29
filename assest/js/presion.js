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

// Función para el cálculo de presión
function calculoPresion() {
  // Obtenemos los valores de los campos del formulario
  const fuerzaCilindro = parseFloat(document.getElementById("fuerza").value);
  const alto = parseFloat(document.getElementById("alto").value);
  const ancho = parseFloat(document.getElementById("ancho").value);
  const fuerzaError = document.getElementById("fuerzaError");
  const altoError = document.getElementById("altoError");
  const anchoError = document.getElementById("anchoError");

  // Validamos los valores ingresados
  if (!validarValor(fuerzaCilindro, fuerzaError, "Por favor, ingresa un valor numérico válido.")) return;
  if (!validarValor(alto, altoError, "Por favor, ingresa un valor numérico válido.")) return;
  if (!validarValor(ancho, anchoError, "Por favor, ingresa un valor numérico válido.")) return;

  // Calculamos las variables necesarias
  const area = alto * ancho;
  const presion = fuerzaCilindro / area;

  // Mostramos el resultado en pantalla
  document.getElementById("resultado").innerHTML = presion.toFixed(2) + " Ton";

  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(fuerzaCilindro, alto, ancho, presion);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(fuerzaCilindro, alto, ancho, presion) {
  const procesoDiv = document.getElementById("procesoPresion");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
        <h3>Proceso y Fórmula:</h3>
        <p class="formula">Fórmula = Fuerza / Área</p>
        <p class="formula"> = ${fuerzaCilindro} / (${alto} * ${ancho})</p>
        <p class="formula">Presión ≈ ${presion.toFixed(2)} Ton/m²</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
      <h3>Process and Formula:</h3>
      <p class="formula">Formula = Force / Area</p>
      <p class="formula"> = ${fuerzaCilindro} / (${alto} * ${ancho})</p>
      <p class="formula">Pressure ≈ ${presion.toFixed(2)} Ton/m²</p>
    `;
  }

  // Mostrar el div de la imagen
  const imagenProcesoDiv = document.getElementById("imagenProceso");
  imagenProcesoDiv.style.display = "block";
}

// Función para ocultar la imagen de proceso
function ocultarImagen() {
  const imagenProcesoDiv = document.getElementById("imagenProceso");
  imagenProcesoDiv.style.display = "none";
}
