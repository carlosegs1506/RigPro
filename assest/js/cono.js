// Función para el cálculo del peso de un cono truncado
document.addEventListener("DOMContentLoaded", function() {
  const inputs = [
    { id: "alto", errorId: "altoError" },
    { id: "diametro_superior", errorId: "diametro_superiorError" },
    { id: "diametro_inferior", errorId: "diametro_inferiorError" },
    { id: "peso_material", errorId: "peso_materialError" }
  ];

  inputs.forEach(input => {
    document.getElementById(input.id).addEventListener("input", function() {
      if (!isNaN(parseFloat(this.value))) {
        ocultarError(input.errorId);
      }
    });
  });
});

// Función para el cálculo del peso de un cono truncado
function calculoCono() {
  const campos = [
    { id: "alto", errorId: "altoError" },
    { id: "diametro_superior", errorId: "diametro_superiorError" },
    { id: "diametro_inferior", errorId: "diametro_inferiorError" },
    { id: "peso_material", errorId: "peso_materialError" }
  ];

  const valores = campos.map(campo => parseFloat(document.getElementById(campo.id).value));
  const [altoCono, dSuperior, dInferior, pesoEspecificoCono] = valores;

  // Ocultar todos los mensajes de error antes de la validación
  campos.forEach(campo => ocultarError(campo.errorId));

  // Validar los valores ingresados y mostrar el primer error encontrado
  for (let i = 0; i < valores.length; i++) {
    if (isNaN(valores[i])) {
      mostrarError(campos[i].errorId, "Por favor, ingresa un valor numérico válido");
      return;
    }
  }

  // Calculamos el volumen del cono truncado según la nueva fórmula
  const volumenCono = (altoCono / 3) * (Math.PI / 4) * 
    (Math.pow(dInferior, 2) + Math.pow(dSuperior, 2) + dInferior * dSuperior);

  // Calculamos el peso del cono en toneladas y kilogramos
  const pesoToneladas = volumenCono * pesoEspecificoCono;
  const pesoKilogramos = pesoToneladas * 1000;

  // Mostramos el resultado en pantalla
  document.getElementById("cono").innerHTML = `${pesoToneladas.toFixed(2)} Ton | ${pesoKilogramos.toFixed(2)} kg`;

  // Mostrar el proceso y fórmulas utilizadas
  mostrarProceso(altoCono, dSuperior, dInferior, pesoEspecificoCono, volumenCono, pesoToneladas, pesoKilogramos);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(altoCono, dSuperior, dInferior, pesoEspecificoCono, volumenCono, pesoToneladas, pesoKilogramos) {
  const procesoDiv = document.getElementById("procesoCono");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Fórmulas:</h3>
    <p class="formula">Volumen = Altura ÷ 3 × π ÷ 4 × (Diametro inferior² + Diametro superior² + Diametro inferior × Diametro superior)</p>
    <p class="formula">= ${altoCono} ÷ 3 × π ÷ 4 × (${dInferior}² + ${dSuperior}² + ${dInferior} × ${dSuperior})</p>
    <p class="formula">= ${volumenCono.toFixed(4)} m³</p>
    <p>3. Calculamos el peso del cono:</p>
    <p class="formula">Peso (Toneladas) = Volumen × Peso Específico</p>
    <p class="formula">= ${volumenCono.toFixed(4)} m³ × ${pesoEspecificoCono} T/m³</p>
    <p class="formula">= ${pesoToneladas.toFixed(2)} Ton</p>
    <p class="formula">Peso (Kilogramos) = Peso (Toneladas) × 1000</p>
    <p class="formula">= ${pesoToneladas.toFixed(2)} × 1000</p>
    <p class="formula">= ${pesoKilogramos.toFixed(2)} kg</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Process and Formulas:</h3>
    <p class="formula">Volume = Height ÷ 3 × π ÷ 4 × (Bottom Diameter² + Top Diameter² + Bottom Diameter × Top Diameter)</p>
    <p class="formula">= ${altoCono} ÷ 3 × π ÷ 4 × (${dInferior}² + ${dSuperior}² + ${dInferior} × ${dSuperior})</p>
    <p class="formula">= ${volumenCono.toFixed(4)} m³</p>
    <p>3. Calculate the weight of the cone:</p>
    <p class="formula">Weight (Tons) = Volume × Specific Weight</p>
    <p class="formula">= ${volumenCono.toFixed(4)} m³ × ${pesoEspecificoCono} T/m³</p>
    <p class="formula">= ${pesoToneladas.toFixed(2)} Ton</p>
    <p class="formula">Weight (Kilograms) = Weight (Tons) × 1000</p>
    <p class="formula">= ${pesoToneladas.toFixed(2)} × 1000</p>
    <p class="formula">= ${pesoKilogramos.toFixed(2)} kg</p>
    `;
  }
  // Mostrar el div de la imagen
  document.getElementById("imagenProceso").style.display = "block";
}

// Función para mostrar mensajes de error
function mostrarError(elementoId, mensaje) {
  ocultarImagen();
  
  // Ocultar todos los mensajes de error
  ["altoError", "diametro_superiorError", "diametro_inferiorError", "peso_materialError"].forEach(ocultarError);

  // Mostrar el error correspondiente
  const errorElemento = document.getElementById(elementoId);
  errorElemento.textContent = mensaje;
  errorElemento.style.color = "red";
}

// Función para ocultar mensajes de error
function ocultarError(elementoId) {
  const errorElemento = document.getElementById(elementoId);
  errorElemento.textContent = "";
  errorElemento.style.color = "initial";
}

// Función para ocultar la imagen de proceso
function ocultarImagen() {
  document.getElementById("imagenProceso").style.display = "none";
}
