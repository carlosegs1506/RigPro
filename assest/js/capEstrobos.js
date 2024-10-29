// Función para calcular la capacidad de estrobo
function calcularCapacidad() {
  // Obtenemos los valores del campo del formulario
  const capacidadInput = document.getElementById("capacidad");
  const capacidad = parseCapacidad(capacidadInput.value);
  const tipoAmarre = document.getElementById("amarre").value;
  const capacidadError = document.getElementById("capacidadError");
  
  // Validar los valores ingresados
  if (isNaN(capacidad)) {
    mostrarError(capacidadError, "Por favor, ingresa un valor numérico válido.");
    return;
  }

  // Ocultar mensajes de error si no hay errores
  ocultarError(capacidadError);

  // Calcular la capacidad según el tipo de amarre
  const factor = 9.72;
  let resultado = capacidad * capacidad * factor;
  if (tipoAmarre === "lazo") {
    resultado *= 0.75;
  } else if (tipoAmarre === "canasta") {
    resultado *= 2;
  }

  // Mostrar el resultado en pantalla
  document.getElementById("resultado").innerText = `${resultado.toFixed(2)} Ton`;
  
  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(capacidad, resultado);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(capacidad, resultado) {
  const procesoDiv = document.getElementById("procesoEstrobo");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmula:</h3>
    <p class="formula">
    Fórmula = <br>
    Axial = ${capacidad} * ${capacidad} * ${9.72}
    <br>
    Lazo = ${capacidad} * ${capacidad} * ${9.72} * ${0.75}
    <br>
    Canasta = ${capacidad} * ${capacidad} * ${9.72} * ${2}
    <br>
    </p>
    <p class="formula">Capacidad ≈ ${resultado.toFixed(2)} Ton</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formula:</h3>
    <p class="formula">
    Formula = 
    Axial = ${capacidad} * ${capacidad} * ${9.72}<br>
    Loop = ${capacidad} * ${capacidad} * ${9.72} * ${0.75}<br>
    Basket = ${capacidad} * ${capacidad} * ${9.72} * ${2}
    </p>
    <p class="formula">Capacity ≈ ${resultado.toFixed(2)} Ton</p>
    `;
  }
}

// Función para parsear la capacidad, permitiendo formatos numéricos y fraccionales
function parseCapacidad(capacidadInput) {
  try {
    return eval(capacidadInput);
  } catch {
    return null;
  }
}

// Función para mostrar mensajes de error
function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.color = "red";
}

// Función para ocultar mensajes de error
function ocultarError(elemento) {
  elemento.textContent = "";
  elemento.style.color = "initial";
}

// Evento para validar el campo de capacidad en tiempo real
document.getElementById("capacidad").addEventListener("input", () => {
  const capacidad = parseCapacidad(document.getElementById("capacidad").value);
  const capacidadError = document.getElementById("capacidadError");

  if (isNaN(capacidad)) {
    mostrarError(capacidadError, "Por favor, ingresa un valor numérico válido.");
  } else {
    ocultarError(capacidadError);
  }
});
