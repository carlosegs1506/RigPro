// Función para calcular el volumen de la viga
function calcularVolumenViga() {
  // Obtenemos los valores de los campos del formulario
  const largoViga = parseFloat(document.getElementById("largo_ab").value.replace(",", "."));
  const anchoViga = parseFloat(document.getElementById("ancho_ab").value.replace(",", "."));
  const espesorViga = parseFloat(document.getElementById("espesor_ab").value.replace(",", "."));
  const largoVigaCentral = parseFloat(document.getElementById("largo_c").value.replace(",", "."));
  const anchoVigaCentral = parseFloat(document.getElementById("ancho_c").value.replace(",", "."));
  const espesorVigaCentral = parseFloat(document.getElementById("espesor_c").value.replace(",", "."));
  const pesoEspecifico = parseFloat(document.getElementById("peso_especifico").value.replace(",", "."));

  const campos = [
    { valor: largoViga, errorId: 'largo_abError' },
    { valor: anchoViga, errorId: 'ancho_abError' },
    { valor: espesorViga, errorId: 'espesor_abError' },
    { valor: largoVigaCentral, errorId: 'largo_cError' },
    { valor: anchoVigaCentral, errorId: 'ancho_cError' },
    { valor: espesorVigaCentral, errorId: 'espesor_cError' },
    { valor: pesoEspecifico, errorId: 'peso_especificoError' }
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

  // Realizamos el cálculo del volumen en mm³ y luego multiplicamos por el peso específico (en kg por mm³)
  const volumenVigaAB = (largoViga * anchoViga * espesorViga * pesoEspecifico * 2) / 1000000; // Volumen en kg
  const volumenVigaC = (largoVigaCentral * anchoVigaCentral * espesorVigaCentral * pesoEspecifico) / 1000000; // Volumen en kg
  const pesoKilogramos = volumenVigaAB + volumenVigaC; // Peso en kg
  const pesoToneladas = pesoKilogramos / 1000; // Peso en toneladas métricas

  // Mostramos el resultado en pantalla
  document.getElementById("vigaH").textContent = `${pesoKilogramos.toFixed(2)} kg | ${pesoToneladas.toFixed(3)} Ton`;

  // Mostramos el proceso y fórmulas utilizadas
  mostrarProcesoViga(largoViga, anchoViga, espesorViga, pesoEspecifico, largoVigaCentral, anchoVigaCentral, espesorVigaCentral, volumenVigaAB, volumenVigaC, pesoKilogramos, pesoToneladas);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProcesoViga(largoViga, anchoViga, espesorViga, pesoEspecifico, largoVigaCentral, anchoVigaCentral, espesorVigaCentral, volumenVigaAB, volumenVigaC, pesoKilogramos, pesoToneladas) {
  const procesoDiv = document.getElementById("procesoViga");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmulas:</h3>
    <p class="formula">Fórmula = Largo * Ancho * Espesor * Peso Específico * 2</p>
    <p class="formula">= ${largoViga} * ${anchoViga} * ${espesorViga} * ${pesoEspecifico} * 2</p>
    <p class="formula">Volumen A y B = ${(volumenVigaAB * 1000).toFixed(2)} g (=${volumenVigaAB.toFixed(2)} kg)</p>
    <p>3. Obtenemos los valores de largo, ancho, espesor y peso específico de la sección C.</p>
    <p>4. Realizamos el cálculo del volumen de la sección C:</p>
    <p class="formula">Fórmula = Largo * Ancho * Espesor * Peso Específico</p>
    <p class="formula">= ${largoVigaCentral} * ${anchoVigaCentral} * ${espesorVigaCentral} * ${pesoEspecifico}</p>
    <p class="formula">Volumen C = ${(volumenVigaC * 1000).toFixed(2)} g (=${volumenVigaC.toFixed(2)} kg)</p>
    <p>5. Calculamos el peso total de la viga:</p>
    <p class="formula">Fórmula = Volumen A y B + Volumen C</p>
    <p class="formula">= ${(volumenVigaAB * 1000).toFixed(2)} g + ${(volumenVigaC * 1000).toFixed(2)} g</p>
    <p class="formula">Peso Viga = ${pesoKilogramos.toFixed(2)} kg (=${pesoToneladas.toFixed(3)} Ton)</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formulas:</h3>
    <p class="formula">Formula = Length * Width * Thickness * Specific Weight * 2</p>
    <p class="formula">= ${largoViga} * ${anchoViga} * ${espesorViga} * ${pesoEspecifico} * 2</p>
    <p class="formula">Volume A and B = ${(volumenVigaAB * 1000).toFixed(2)} g (=${volumenVigaAB.toFixed(2)} kg)</p>
    <p>3. We obtain the values for length, width, thickness, and specific weight for section C.</p>
    <p>4. We calculate the volume of section C:</p>
    <p class="formula">Formula = Length * Width * Thickness * Specific Weight</p>
    <p class="formula">= ${largoVigaCentral} * ${anchoVigaCentral} * ${espesorVigaCentral} * ${pesoEspecifico}</p>
    <p class="formula">Volume C = ${(volumenVigaC * 1000).toFixed(2)} g (=${volumenVigaC.toFixed(2)} kg)</p>
    <p>5. We calculate the total weight of the beam:</p>
    <p class="formula">Formula = Volume A and B + Volume C</p>
    <p class="formula">= ${(volumenVigaAB * 1000).toFixed(2)} g + ${(volumenVigaC * 1000).toFixed(2)} g</p>
    <p class="formula">Beam Weight = ${pesoKilogramos.toFixed(2)} kg (=${pesoToneladas.toFixed(3)} Ton)</p>

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

function ocultarError(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = "";
  } else {
    console.warn(`Elemento con ID "${idElemento}" no encontrado.`);
  }
}

function ocultarImagen() {
  document.getElementById("imagenProceso").style.display = "none";
}

// Ejecutamos la función cuando se hace clic en el botón
document.addEventListener("click", calcularVolumenViga);
