// Función para mostrar mensajes de error
function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.color = "red";
  ocultarImagen();  // Ocultar imagen cuando se muestra un error
}

// Función para ocultar mensajes de error
function ocultarError(elemento) {
  elemento.textContent = "";
  elemento.style.color = "initial";
}

// Función para ocultar el div de la imagen
function ocultarImagen() {
  document.getElementById("imagenProceso").style.display = "none";
}

// Función para calcular las líneas de carga
function calcularLineasCarga() {
  // Obtener valores de los campos del formulario
  const cargaElemento = parseFloat(document.getElementById('carga').value);
  const capacidadCable = parseFloat(document.getElementById('capacidad').value);

  // Validar los valores ingresados y mostrar errores
  const errores = [
    { value: cargaElemento, elemento: document.getElementById('cargaError'), mensaje: "Por favor, ingresa un valor numérico válido." },
    { value: capacidadCable, elemento: document.getElementById('capacidadError'), mensaje: "Por favor, ingresa un valor numérico válido." }
  ];

  for (const { value, elemento, mensaje } of errores) {
    if (isNaN(value)) {
      mostrarError(elemento, mensaje);
      return;
    }
    ocultarError(elemento);
  }

  // Cálculo de la presión dinámica en kg/m²
  const lineasCarga = cargaElemento / capacidadCable;

  // Mostrar el resultado en la pantalla
  document.getElementById('result').innerHTML = `<p>Líneas de Carga: ${lineasCarga.toFixed(2)}</p>`;

  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(cargaElemento, capacidadCable, lineasCarga);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(cargaElemento, capacidadCable, lineasCarga) {
  const procesoDiv = document.getElementById("procesoPoleas");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmulas:</h3>
    <p class="formula">Fórmula = Carga / Capacidad Cable</p>
    <p class="formula">= ${cargaElemento} / ${capacidadCable}</p>
    <p class="formula">Líneas de carga ≈ ${lineasCarga.toFixed(2)}</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formulas:</h3>
    <p class="formula">Formula = Load / Cable Capacity</p>
    <p class="formula">= ${cargaElemento} / ${capacidadCable}</p>
    <p class="formula">Load Lines ≈ ${lineasCarga.toFixed(2)}</p>

    `;
  }
}




