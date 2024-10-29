// Función para convertir unidades de longitud y peso
function convertirUnidades() {
  // Obtenemos los valores de los campos del formulario
  const valor = parseFloat(document.getElementById("valor").value);
  const unidadesOrigen = document.getElementById("unidadesOrigen").value;
  const unidadesDestino = document.getElementById("unidadesDestino").value;
  const resultadoInput = document.getElementById("resultado");
  const valorError = document.getElementById("valorError");

  // Validamos los valores ingresados
  if (isNaN(valor)) {
    mostrarError(valorError, "Por favor, ingresa un valor numérico válido.");
    return;
  }

  // Si no hay errores, ocultar el mensaje de error
  ocultarError(valorError);

  // Convertir longitud
  const conversionLongitud = {
    milimetros: {
      metros: valor / 1000,
      centimetros: valor / 10,
      pulgadas: valor / 25.4,
    },
    centimetros: {
      metros: valor / 100,
      milimetros: valor * 10,
      pulgadas: valor * 0.394,
    },
    metros: {
      milimetros: valor * 1000,
      centimetros: valor * 100,
      pulgadas: valor * 39.37,
    },
    pies: {
      metros: valor * 0.3048,
    },
    pulgadas: {
      metros: valor * 0.0254,
      milimetros: valor * 25.4,
    },
  };

  // Convertir peso
  const conversionPeso = {
    libras: {
      kilogramos: valor * 0.453592,
      toneladas: valor * 0.000453592,
    },
    kilogramos: {
      libras: valor * 2.20462,
      toneladas: valor * 0.001,
    },
  };

  // Determinar si estamos manejando longitud o peso
  let resultado = 0;
  if (['milimetros', 'centimetros', 'metros', 'pies', 'pulgadas'].includes(unidadesOrigen)) {
    resultado = conversionLongitud[unidadesOrigen]?.[unidadesDestino] || 0;
  } else if (['libras', 'kilogramos'].includes(unidadesOrigen)) {
    resultado = conversionPeso[unidadesOrigen]?.[unidadesDestino] || 0;
  }

  // Mostrar en pantalla el resultado
  resultadoInput.value = resultado ? `${resultado.toFixed(2)} ${unidadesDestino}` : 'Conversión no disponible';
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
