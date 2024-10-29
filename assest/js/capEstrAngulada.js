// Función para calcular la capacidad de estrobo
function calcularCapacidad() {
  // Obtenemos los valores del campo del formulario
  const capacidadInput = document.getElementById("capacidadEstrobo");
  const capacidad = parseCapacidad(capacidadInput.value);
  const tipoAmarre = document.getElementById("amarre").value;

  // Obtenemos el elemento de error
  const capacidadError = document.getElementById("capacidadError");

  // Validamos el valor ingresado
  if (isNaN(capacidad)) {
    mostrarError(capacidadError, "Por favor, ingresa un valor numérico válido.");
    return;
  }

  // Ocultamos el mensaje de error si no hay errores
  ocultarError(capacidadError);

  // Calculamos la capacidad según su tipo de amarre
  let resultado;
  if (capacidad !== null) {
    const factor = capacidad * capacidad * 9.72;
    if (tipoAmarre === "lazo") {
      resultado = factor * 0.75;
    } else if (tipoAmarre === "canasta") {
      resultado = factor * 2;
    } else {
      resultado = factor;
    }

    // Mostramos los resultados en pantalla
    document.getElementById("resultado").innerText = `${resultado.toFixed(2)} Ton`;
  } else {
    // En caso de introducir un valor no numérico, mostramos un error
    document.getElementById("resultado").innerText = "Ingresa una capacidad válida.";
  }
}

// Función para parsear la capacidad, permitiendo formatos numéricos y fraccionales
function parseCapacidad(capacidadInput) {
  try {
    return eval(capacidadInput);
  } catch (error) {
    return null;
  }
}

// Función para calcular la capacidad segura de trabajo en estrobos
function capacidadSegura() {
  // Obtenemos los valores ingresados
  const anguladaInput = document.getElementById("angulada");
  const largoSeguroInput = document.getElementById("largo");
  const alturaSeguraInput = document.getElementById("altura");

  const angulada = parseFloat(anguladaInput.value);
  const largoSeguro = parseFloat(largoSeguroInput.value);
  const alturaSegura = parseFloat(alturaSeguraInput.value);

  // Obtenemos los elementos de error
  const anguladaError = document.getElementById("anguladaError");
  const largoError = document.getElementById("largoError");
  const alturaError = document.getElementById("alturaError");

  // Validamos los valores ingresados
  if (isNaN(angulada)) {
    mostrarError(anguladaError, "Por favor, ingresa un valor numérico válido.");
    return;
  }
  if (isNaN(largoSeguro)) {
    mostrarError(largoError, "Por favor, ingresa un valor numérico válido.");
    return;
  }
  if (isNaN(alturaSegura)) {
    mostrarError(alturaError, "Por favor, ingresa un valor numérico válido.");
    return;
  }

  // Ocultamos los mensajes de error si no hay errores
  ocultarError(anguladaError);
  ocultarError(largoError);
  ocultarError(alturaError);

  // Calculamos la capacidad segura
  const capacidadSegura = (angulada * largoSeguro) / alturaSegura;

  // Mostramos el resultado en la página
  document.getElementById("capacidadSeguraEstrobo").innerHTML = capacidadSegura.toFixed(1) + " Kgs";

  // Mostramos el proceso y fórmulas utilizadas
  mostrarProceso(angulada, largoSeguro, alturaSegura, capacidadSegura);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(angulada, largoSeguro, alturaSegura, capacidadSegura) {
  const procesoDiv = document.getElementById("proceso45");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmula:</h3>
    <p class="formula">Fórmula = Capacidad * Largo / Altura</p>
    <p class="formula">= ${angulada} * ${largoSeguro} / ${alturaSegura}</p>
    <p class="formula">Carga Segura ≈ ${capacidadSegura.toFixed(2)} Kgs</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formula:</h3>
    <p class="formula">Formula = Capacity * Length / Height</p>
    <p class="formula">= ${angulada} * ${largoSeguro} / ${alturaSegura}</p>
    <p class="formula">Safe Load ≈ ${capacidadSegura.toFixed(2)} Kgs</p>
    `;
  }
}

// Función para mostrar error
function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.color = "red";
}

// Función para ocultar error
function ocultarError(elemento) {
  elemento.textContent = "";
  elemento.style.color = "initial";
}

// Eventos para validar los campos antes de calcular
document.getElementById("capacidadEstrobo").addEventListener("input", () => {
  const capacidad = parseCapacidad(document.getElementById("capacidadEstrobo").value);
  const capacidadError = document.getElementById("capacidadError");

  if (isNaN(capacidad)) {
    mostrarError(capacidadError, "Por favor, ingresa un valor numérico válido.");
  } else {
    ocultarError(capacidadError);
  }
});

document.getElementById("angulada").addEventListener("input", () => {
  const angulada = parseFloat(document.getElementById("angulada").value);
  const anguladaError = document.getElementById("anguladaError");

  if (isNaN(angulada)) {
    mostrarError(anguladaError, "Por favor, ingresa un valor numérico válido.");
  } else {
    ocultarError(anguladaError);
  }
});

document.getElementById("largo").addEventListener("input", () => {
  const largoSeguro = parseFloat(document.getElementById("largo").value);
  const largoError = document.getElementById("largoError");

  if (isNaN(largoSeguro)) {
    mostrarError(largoError, "Por favor, ingresa un valor numérico válido.");
  } else {
    ocultarError(largoError);
  }
});

document.getElementById("altura").addEventListener("input", () => {
  const alturaSegura = parseFloat(document.getElementById("altura").value);
  const alturaError = document.getElementById("alturaError");

  if (isNaN(alturaSegura)) {
    mostrarError(alturaError, "Por favor, ingresa un valor numérico válido.");
  } else {
    ocultarError(alturaError);
  }
});
