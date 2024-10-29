// Función para calcular el peso de una barra de construcción
function calculoBarraFierro() {
  // Obtenemos los valores de los campos del formulario
  const diametroBarraInput = document.getElementById("diametro");
  const largoBarraInput = document.getElementById("largo");

  const diametroBarra = parseFloat(diametroBarraInput.value);
  const largoBarra = parseFloat(largoBarraInput.value);

  // Validar los valores ingresados
  const campos = [
    { valor: diametroBarra, errorId: 'diametroError', elemento: diametroBarraInput },
    { valor: largoBarra, errorId: 'largoError', elemento: largoBarraInput }
  ];

  let validacionExitosa = true;

  for (let campo of campos) {
    if (isNaN(campo.valor)) {
      mostrarError(campo.errorId, "Por favor, ingresa un valor numérico válido.");
      validacionExitosa = false;
      break;
    } else {
      ocultarError(campo.errorId);
    }
  }

  if (!validacionExitosa) return;

  // Si no hay errores, ocultar los mensajes de error
  ocultarError("diametroError");
  ocultarError("largoError");

  // Realizamos el cálculo
  const resultadoPesoBarra = Math.pow(diametroBarra, 2) * 6.17 * largoBarra;
  const resultadoFinal = resultadoPesoBarra / 1000000;

  // Mostramos el resultado en pantalla
  document.getElementById("barraFierro").textContent = resultadoFinal.toFixed(1) + " Kg";

  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(diametroBarra, largoBarra, resultadoPesoBarra, resultadoFinal);
}

// Codigo nuevo
// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(diametroBarra, largoBarra, resultadoPesoBarra, resultadoFinal) {
  const procesoDiv = document.getElementById("procesoBarra");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Fórmula y Proceso:</h3>
    <p class="formula">Fórmula = Diámetro<sup>2</sup> * Constante (6.17) * Largo</p>
    <p class="formula"> = ${diametroBarra}<sup>2</sup> * 6.17 * ${largoBarra}</p>
    <p class="formula">Peso ≈ ${resultadoFinal.toFixed(1)} Kg</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Formula and Process:</h3>
    <p class="formula">Formula = Diameter<sup>2</sup> * Constant (6.17) * Length</p>
    <p class="formula"> = ${diametroBarra}<sup>2</sup> * 6.17 * ${largoBarra}</p>
    <p class="formula">Weight ≈ ${resultadoFinal.toFixed(1)} Kg</p>
    `;
  }
  // Mostrar el div de la imagen
  document.getElementById("imagenProceso").style.display = "block";
}

// Función para mostrar mensajes de error
function mostrarError(idElemento, mensaje) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = mensaje;
    elemento.style.color = "red";
  } else {
    console.warn(`Elemento con ID "${idElemento}" no encontrado.`);
  }
  ocultarImagen();
}

// Función para ocultar mensajes de error
function ocultarError(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = "";
    elemento.style.color = "initial";
  } else {
    console.warn(`Elemento con ID "${idElemento}" no encontrado.`);
  }
}

// Función para ocultar la imagen de proceso
function ocultarImagen() {
  document.getElementById("imagenProceso").style.display = "none";
}

// Ejecutamos la función cuando se hace clic en el botón
document.addEventListener("click", calculoBarraFierro);
