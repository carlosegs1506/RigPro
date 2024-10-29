//Funcion para el calculo de tension eslina lazo simple
document.addEventListener("DOMContentLoaded", () => {
  //Obtenemos los datos ingresados
  const inputCapacidad = document.getElementById("capacidad");
  const errorCapacidad = document.getElementById("capacidadError");

  inputCapacidad.addEventListener("input", () => validarCampo(inputCapacidad, errorCapacidad));
  inputCapacidad.addEventListener("blur", () => validarCampo(inputCapacidad, errorCapacidad));
});

//Validamos los campos
function validarCampo(input, errorElemento) {
  if (input.value.trim() === "" || isNaN(input.value)) {
    mostrarError(errorElemento, "Por favor, ingresa un valor numérico válido.");
    return false;
  } else {
    ocultarError(errorElemento);
    return true;
  }
}

//Realizamos el calculo
function calculoTensionAhorcadoSimple() {
  let capacidadAhorcado = parseFloat(document.getElementById("capacidad").value);
  const errorCapacidad = document.getElementById("capacidadError");

  if (!validarCampo(document.getElementById("capacidad"), errorCapacidad)) {
    return;
  }

  const tensionAhorcadoSimple = capacidadAhorcado * 0.75;
  document.getElementById("ahorcadoSimple").innerHTML = tensionAhorcadoSimple.toFixed(2) + " kg";
  mostrarProceso(capacidadAhorcado, tensionAhorcadoSimple);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(capacidadAhorcado, tensionAhorcadoSimple) {
  const procesoDiv = document.getElementById("procesoSimple");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmula:</h3>
    <p class="formula">Fórmula = Capacidad Maniobra * 0.75</p>
    <p class="formula">= ${capacidadAhorcado} * 0.75</p>
    <p class="formula">Capacidad ≈ ${tensionAhorcadoSimple.toFixed(2)} Kg</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formula:</h3>
    <p class="formula">Formula = Working Capacity * 0.75</p>
    <p class="formula">= ${capacidadAhorcado} * 0.75</p>
    <p class="formula">Capacity ≈ ${tensionAhorcadoSimple.toFixed(2)} Kg</p>

    `;
  }

  // Mostrar el div de la imagen
  const imagenProcesoDiv = document.getElementById("imagenProceso");
  imagenProcesoDiv.style.display = "block";
}

// Función para ocultar el div de la imagen
function ocultarImagen() {
  document.getElementById("imagenProceso").style.display = "none";
}

// 

// Función para ocultar el div de la imagen
function ocultarImagen() {
  const imagenProcesoDiv = document.getElementById("imagenProceso");
  imagenProcesoDiv.style.display = "none";
}

// Función para mostrar mensajes de error
function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  ocultarImagen();
}

// Función para ocultar mensajes de error
function ocultarError(elemento) {
  elemento.textContent = "";
  elemento.style.color = "initial";
}
