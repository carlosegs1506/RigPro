// Función para el cálculo del centro de gravedad 90° al centro
function calculoGravedadCentro() {
  // Obtenemos los valores de los campos del formulario
  const pesoCentrado = parseFloat(document.getElementById("peso").value);
  const dife1 = parseFloat(document.getElementById("diferencia1").value);
  const disTotal = parseFloat(document.getElementById("distancia").value);

  const campos = [
    { valor: pesoCentrado, errorId: 'pesoError' },
    { valor: dife1, errorId: 'diferencia1Error' },
    { valor: disTotal, errorId: 'distanciaError' }
  ];

  // Validar los valores ingresados
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

  // Realizamos el cálculo
  const resultadoGravedadCentro = (pesoCentrado * dife1) / disTotal;

  // Mostramos el resultado en pantalla
  document.getElementById("gravedadCentro").textContent = `${resultadoGravedadCentro.toFixed(2)} Kg`;

  // Mostramos el proceso y fórmulas utilizadas
  mostrarProceso(pesoCentrado, dife1, disTotal, resultadoGravedadCentro);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(pesoCentrado, dife1, disTotal, resultadoGravedadCentro) {
  const procesoDiv = document.getElementById("procesoCentro");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Fórmula y Proceso:</h3>
    <p class="formula">Fórmula = Peso * Diferencia 1 / Distancia Total</p>
    <p class="formula">= ${pesoCentrado} * ${dife1} / ${disTotal}</p>
    <p class="formula">Tensión = ${resultadoGravedadCentro.toFixed(2)} Kg</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Formula and Process:</h3>
    <p class="formula">Formula = Weight * Difference 1 / Total Distance</p>
    <p class="formula">= ${pesoCentrado} * ${dife1} / ${disTotal}</p>
    <p class="formula">Tension = ${resultadoGravedadCentro.toFixed(2)} Kg</p>

    `;
  }

  // Mostrar el div de la imagen
  document.getElementById("imagenProceso").style.display = "block";
}

// Función para ocultar el div de la imagen
function ocultarImagen() {
  document.getElementById("imagenProceso").style.display = "none";
}

// Funciones para manejar errores
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

function ocultarError(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = "";
    elemento.style.color = "initial";
  } else {
    console.warn(`Elemento con ID "${idElemento}" no encontrado.`);
  }
}

// Ejecutamos la función cuando se hace clic en el botón
document.querySelector(".calcular").addEventListener("click", calculoGravedadCentro);
