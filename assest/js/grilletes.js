// Función para el cálculo de capacidad de grillete
function calcularCapacidad() {
  console.log("Función calcularCapacidad llamada"); // Verificar si la función se llama

  // Obtenemos los valores ingresados
  const capacidadInput = document.getElementById("capacidad").value;
  console.log("Valor de entrada (capacidadInput):", capacidadInput); // Verificar el valor ingresado

  const capacidad = parseCapacidad(capacidadInput);
  console.log("Valor de capacidad después de parsear:", capacidad); // Verificar el valor después de parsear

  // Validar los valores ingresados
  if (isNaN(capacidad)) {
    mostrarError(
      capacidadError,
      "Por favor, ingresa un valor numérico válido."
    );
    console.log("Error: capacidad no es un número válido"); // Verificar si se detecta un error
    return;
  }

  // Si no hay errores, ocultar los mensajes de error
  ocultarError(capacidadError);

  // Realizarmos el cálculo
  if (capacidad !== null) {
    const resultado = capacidad * capacidad * 8.5;
    console.log("Resultado del cálculo:", resultado); // Verificar el resultado del cálculo

    // Mostramos el resultado en pantalla
    document.getElementById("resultado").innerText = `${resultado.toFixed(1)} Ton`;
    console.log("Resultado mostrado en pantalla:", `${resultado.toFixed(1)} Ton`); // Verificar si se muestra el resultado

    mostrarProceso(capacidad, resultado);
  } else {
    // En caso de introducir un valor no numérico mostramos error
    document.getElementById("resultado").innerText = "Ingresa un valor numerico.";
    console.log("Error: valor ingresado no es numérico"); // Mensaje de error en caso de valor no numérico
  }
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(capacidad, resultado) {
  console.log("Función mostrarProceso llamada"); // Verificar si se llama la función

  const procesoDiv = document.getElementById("procesoDesarrollo");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;
  console.log("Idioma detectado:", lang); // Verificar el idioma de la página

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
      <h3>Fórmula y Desarrollo:</h3>
      <p class="formula">Formula = Capacidad * Capacidad * 8.5</p>
      <p class="formula"> = ${capacidad} * ${capacidad} * ${8.5}</p>
      <p class="formula">Capacidad ≈ ${resultado.toFixed(2)} Ton</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
      <h3>Formula and Development:</h3>
      <p class="formula">Formula = Capacity * Capacity * 8.5</p>
      <p class="formula"> = ${capacidad} * ${capacidad} * ${8.5}</p>
      <p class="formula">Capacity ≈ ${resultado.toFixed(2)} Tons</p>
    `;
  }

  console.log("Proceso mostrado en pantalla"); // Verificar si el proceso se muestra correctamente
}

// Función para parsear capacidad
function parseCapacidad(capacidadInput) {
  try {
    // Intentamos evaluar la expresión para admitir cualquier formato numérico o fraccional
    return eval(capacidadInput);
  } catch (error) {
    console.log("Error al parsear capacidad:", error); // Mensaje en caso de error
    return null;
  }
}

// Función para mostrar mensajes de error
function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  console.log("Mensaje de error mostrado:", mensaje); // Verificar si se muestra el mensaje de error
}

// Función para ocultar mensajes de error
function ocultarError(elemento) {
  elemento.textContent = "";
  elemento.style.color = "initial";
  console.log("Mensaje de error ocultado"); // Verificar si se oculta el mensaje de error
}
