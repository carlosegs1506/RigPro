//Calculo de carga frontal
document.addEventListener("DOMContentLoaded", () => {
  const inputCargaMaxima = document.getElementById('cargaMaxima');
  const inputAltura = document.getElementById('altura');
  const inputLargo = document.getElementById('largo');
  const errorCarga = document.getElementById('cargaError');
  const errorAltura = document.getElementById('alturaError');
  const errorLargo = document.getElementById('largoError');

  //Obtenemos los datos ingresados
  inputCargaMaxima.addEventListener("input", () => validarCampo(inputCargaMaxima, errorCarga));
  inputCargaMaxima.addEventListener("blur", () => validarCampo(inputCargaMaxima, errorCarga));
  inputAltura.addEventListener("input", () => validarCampo(inputAltura, errorAltura));
  inputAltura.addEventListener("blur", () => validarCampo(inputAltura, errorAltura));
  inputLargo.addEventListener("input", () => validarCampo(inputLargo, errorLargo));
  inputLargo.addEventListener("blur", () => validarCampo(inputLargo, errorLargo));
});

//Validamos los datos
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
function calcularCapacidad() {
  let cargaMaxima = parseFloat(document.getElementById('cargaMaxima').value);
  let altura = parseFloat(document.getElementById('altura').value);
  let largo = parseFloat(document.getElementById('largo').value);
  let numEslingas = parseInt(document.getElementById('eslingas').value);

  const errorCarga = document.getElementById('cargaError');
  const errorAltura = document.getElementById('alturaError');
  const errorLargo = document.getElementById('largoError');

  if (!validarCampo(document.getElementById('cargaMaxima'), errorCarga) ||
      !validarCampo(document.getElementById('altura'), errorAltura) ||
      !validarCampo(document.getElementById('largo'), errorLargo)) {
    return;
  }

  const capacidadRamal = cargaMaxima * (altura / largo) * numEslingas;
  document.getElementById('result').innerText = capacidadRamal.toFixed(2) + " Kg";
  mostrarProceso(cargaMaxima, altura, largo, numEslingas, capacidadRamal);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(cargaMaxima, altura, largo, numEslingas, capacidadRamal) {
  const procesoDiv = document.getElementById("procesoCadenas");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmulas:</h3>
    <p class="formula">Fórmula = Carga * (Altura / Largo) * Número de Ramales</p>
    <p class="formula">= ${cargaMaxima} * (${altura} / ${largo}) * ${numEslingas}</p>
    <p class="formula">Capacidad ≈ ${capacidadRamal.toFixed(2)} Kg</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formulas:</h3>
    <p class="formula">Formula = Load * (Height / Length) * Number of Slings</p>
    <p class="formula">= ${cargaMaxima} * (${altura} / ${largo}) * ${numEslingas}</p>
    <p class="formula">Capacity ≈ ${capacidadRamal.toFixed(2)} Kg</p>

    `;
  }

}

// Mostrar el error en pantalla
function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
}

// Ocultar el error en pantalla
function ocultarError(elemento) {
  elemento.textContent = "";
  elemento.style.color = "initial";
}
