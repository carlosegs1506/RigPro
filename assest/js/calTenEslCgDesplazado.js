// Función para validar y obtener los valores de los campos
function obtenerValores() {
  const campos = [
    { valor: parseFloat(document.getElementById("peso").value), errorId: "pesoError" },
    { valor: parseFloat(document.getElementById("altura").value), errorId: "alturaError" },
    { valor: parseFloat(document.getElementById("dif1").value), errorId: "dif1Error" },
    { valor: parseFloat(document.getElementById("dif2").value), errorId: "dif2Error" },
    { valor: parseFloat(document.getElementById("largo1").value), errorId: "largo1Error" },
    { valor: parseFloat(document.getElementById("largo2").value), errorId: "largo2Error" },
  ];

  return campos;
}

function calcularTensionCentroMovido() {
  const campos = obtenerValores();

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

  // Obtener valores de los campos
  const [carga, altura, dif1, dif2, largo1, largo2] = campos.map(
    (campo) => campo.valor
  );

  // Realizar el cálculo
  const tension1 = (carga * dif2 * largo1) / altura / (dif1 + dif2);
  const tension2 = (carga * dif1 * largo2) / altura / (dif1 + dif2);

  // Mostrar resultados
  document.getElementById("tensionMovida1").innerHTML =
    tension1.toFixed(2) + " Kg";
  document.getElementById("tensionMovida2").innerHTML =
    tension2.toFixed(2) + " Kg";

  // Mostrar proceso y fórmulas
  mostrarProceso(carga, altura, dif1, dif2, largo1, largo2, tension1, tension2);
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

// Función para ocultar el div de la imagen
function ocultarImagen() {
  const imagenProcesoDiv = document.getElementById("imagenProceso");
  imagenProcesoDiv.style.display = "none";
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(
  carga,
  altura,
  dif1,
  dif2,
  largo1,
  largo2,
  tension1,
  tension2) {
  const procesoDiv = document.getElementById("procesoMovido");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Fórmula y Proceso:</h3>
    <p class="formula"> Fórmula Eslinga 1 = <br> Carga * Diferencia 2 * Largo 1 / <br>Altura  (Diferencia 1 + Diferencia 2)</p>
    <p class="formula"> = ${carga} * ${dif2} * ${largo1} / ${altura} / ${dif1} + ${dif2}</p>
    <p class="formula">Tensión 1 = ${tension1.toFixed(2)} Kg</p>
    <hr>
    <p class="formula">Fórmula Eslinga 2 = <br> Carga * Diferencia 1 * Largo 2 / <br> Altura (Diferencia 1 + Diferencia 2)</p>
    <p class="formula"> = ${carga} * ${dif1} * ${largo2} / ${altura} / ${dif1} + ${dif2}</p>
    <p class="formula">Tensión 2 = ${tension2.toFixed(2)} Kg</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Formula and Process:</h3>
    <p class="formula"> Sling 1 Formula = <br> Load * Difference 2 * Length 1 / <br>Height (Difference 1 + Difference 2)</p>
    <p class="formula"> = ${carga} * ${dif2} * ${largo1} / ${altura} / ${dif1} + ${dif2}</p>
    <p class="formula">Tension 1 = ${tension1.toFixed(2)} Kg</p>
    <hr>
    <p class="formula">Sling 2 Formula = <br> Load * Difference 1 * Length 2 / <br> Height (Difference 1 + Difference 2)</p>
    <p class="formula"> = ${carga} * ${dif1} * ${largo2} / ${altura} / ${dif1} + ${dif2}</p>
    <p class="formula">Tension 2 = ${tension2.toFixed(2)} Kg</p>

    `;
  }

  // Mostrar el div de la imagen
  const imagenProcesoDiv = document.getElementById("imagenProceso");
  imagenProcesoDiv.style.display = "block";
}

// Agregar evento de clic al botón cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
  const botonCalcular = document.querySelector(".calcular");
  if (botonCalcular) {
    botonCalcular.addEventListener("click", calcularTensionCentroMovido);
  } else {
    console.warn("No se encontró el botón con la clase 'calcular'.");
  }
});