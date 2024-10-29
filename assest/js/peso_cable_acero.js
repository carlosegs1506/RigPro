// Función para calcular el peso de un cable de acero
function calcularPesoCable() {
  // Obtener los valores de los campos del formulario
  const radio = parseFloat(document.getElementById("radio").value);
  const largo = parseFloat(document.getElementById("largo").value);
  const pesoEspecifico = parseFloat(document.getElementById("peso").value);

  // Inicializar los elementos de error
  const errores = [
    { campo: radio, elemento: "radioError", mensaje: "Por favor, ingresa un valor numérico válido." },
    { campo: largo, elemento: "largoError", mensaje: "Por favor, ingresa un valor numérico válido." },
    { campo: pesoEspecifico, elemento: "pesoError", mensaje: "Por favor, ingresa un valor numérico válido para el peso específico." }
  ];

  // Mostrar el primer mensaje de error y ocultar los demás
  const errorEncontrado = mostrarErrores(errores);

  // Si hay errores, salir de la función
  if (errorEncontrado) return;

  // Calcular las variables necesarias
  const resultadoPesoCable = Math.pow(radio, 2) * Math.PI * largo * pesoEspecifico;
  const resultadoTotal = resultadoPesoCable / 1000;

  // Mostrar el resultado en la página
  document.getElementById("cableAcero").innerHTML = `${resultadoTotal.toFixed(1)} Kg`;

  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(radio, largo, pesoEspecifico, resultadoTotal);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(radio, largo, pesoEspecifico, resultadoTotal) {
  const procesoDiv = document.getElementById("procesoDesarrollo");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
      <h3>Fórmula y Desarrollo:</h3>
      <p class="formula">Fórmula = Radio<sup>2</sup> * PI * Largo * Peso Específico</p>
      <p class="formula"> = ${radio}<sup>2</sup> * ${Math.PI.toFixed(2)} * ${largo} * ${pesoEspecifico}</p>
      <p class="formula">Peso ≈ ${resultadoTotal.toFixed(2)} kg</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Formula and Development:</h3>
    <p class="formula">Formula = Radius<sup>2</sup> * PI * Length * Specific Weight</p>
    <p class="formula"> = ${radio}<sup>2</sup> * ${Math.PI.toFixed(2)} * ${largo} * ${pesoEspecifico}</p>
    <p class="formula">Weight ≈ ${resultadoTotal.toFixed(2)} kg</p>
    `;
  }
}

// Función para mostrar un mensaje de error en un elemento
function mostrarError(elemento, mensaje) {
  const errorElement = document.getElementById(elemento);
  if (errorElement) {
    errorElement.textContent = mensaje;
    errorElement.style.color = "red";
  }
}

// Función para ocultar un mensaje de error
function ocultarError(elemento) {
  const errorElement = document.getElementById(elemento);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.style.color = "initial";
  }
}

// Función para mostrar el primer mensaje de error y ocultar los demás
function mostrarErrores(errores) {
  let errorEncontrado = false;

  // Ocultar todos los mensajes de error
  errores.forEach(error => {
    ocultarError(error.elemento);
  });

  // Mostrar el primer mensaje de error
  for (const error of errores) {
    if (isNaN(error.campo)) {
      mostrarError(error.elemento, error.mensaje);
      errorEncontrado = true;
      break; // Salir después de mostrar el primer error
    }
  }

  return errorEncontrado;
}

// Ejecutar la función cuando se hace clic en el botón
document.querySelector(".enviar").addEventListener("click", calcularPesoCable);
