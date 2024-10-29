//Calculo peso de una esfera
document.addEventListener("DOMContentLoaded", function() {
  const campos = [
    { id: "diametro", errorId: "diametroError" },
    { id: "peso", errorId: "pesoError" }
  ];

  // Añadir event listeners para ocultar errores al ingresar un valor válido
  campos.forEach(campo => {
    document.getElementById(campo.id).addEventListener("input", function() {
      if (!isNaN(parseFloat(this.value))) {
        ocultarError(campo.errorId);
      }
    });
  });
});

// Función para calcular el peso de una esfera
function calculoEsfera() {
  const campos = [
    { id: "diametro", errorId: "diametroError" },
    { id: "peso", errorId: "pesoError" }
  ];

  // Validar los valores ingresados y mostrar el primer error encontrado
  for (let campo of campos) {
    const valor = parseFloat(document.getElementById(campo.id).value);
    if (isNaN(valor)) {
      mostrarError(document.getElementById(campo.errorId), "Por favor, ingresa un valor numérico válido");
      return;
    } else {
      ocultarError(campo.errorId);
    }
  }

  // Obtener los valores después de la validación
  const dEsfera = parseFloat(document.getElementById("diametro").value);
  const pesoEsfera = parseFloat(document.getElementById("peso").value);

  // Calcular el peso de la esfera
  const esfera = ((dEsfera * dEsfera * dEsfera * Math.PI) / 6) * pesoEsfera;
  const resultadoFinal = esfera * 1000;

  // Mostrar el resultado en pantalla
  document.getElementById("esfera").innerHTML = `${resultadoFinal.toFixed(2)} Kg`;

  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(dEsfera, pesoEsfera, resultadoFinal);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(dEsfera, pesoEsfera, resultadoFinal) {
  const procesoDiv = document.getElementById("procesoEsfera");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmula:</h3>
    <p class="formula">Fórmula = diámetro<sup>3</sup> * PI / 6 * Peso específico</p>
    <p class="formula">= ${dEsfera}<sup>3</sup> * ${Math.PI.toFixed(2)} / 6 * ${pesoEsfera}</p>
    <p class="formula">Peso ≈ ${resultadoFinal.toFixed(2)} Kg</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formula:</h3>
    <p class="formula">Formula = diameter<sup>3</sup> * PI / 6 * Specific Weight</p>
    <p class="formula">= ${dEsfera}<sup>3</sup> * ${Math.PI.toFixed(2)} / 6 * ${pesoEsfera}</p>
    <p class="formula">Weight ≈ ${resultadoFinal.toFixed(2)} Kg</p>
    `;
  }

  // Mostrar el div de la imagen
  document.getElementById("imagenProceso").style.display = "block";
}

// Función para mostrar mensajes de error
function mostrarError(elemento, mensaje) {
  ocultarImagen();
  elemento.textContent = mensaje;
  elemento.style.color = "red";
}

// Función para ocultar mensajes de error
function ocultarError(elementoId) {
  const errorElemento = document.getElementById(elementoId);
  if (errorElemento) {
    errorElemento.textContent = "";
    errorElemento.style.color = "initial";
  }
}

// Función para ocultar la imagen de proceso
function ocultarImagen() {
  document.getElementById("imagenProceso").style.display = "none";
}
