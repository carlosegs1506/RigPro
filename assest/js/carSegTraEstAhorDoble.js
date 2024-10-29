// Función para calcular la capacidad de estrobo
function calcularCapacidad() {
    // Obtenemos los valores del campo del formulario
    const capacidadInput = document.getElementById("capacidad").value;
    const capacidad = parseCapacidad(capacidadInput);
    const tipoAmarre = document.getElementById("amarre").value;

    // Validar el primer campo
    if (isNaN(capacidad)) {
        mostrarError(capacidadError, "Por favor, ingresa un valor numérico válido.");
        ocultarError(alturaError);
        ocultarError(largoError);
        return;
    } else {
        ocultarError(capacidadError);
    }

    // Si no hay errores, ocultar los mensajes de error para los otros campos
    ocultarError(alturaError);
    ocultarError(largoError);

    // Calculamos la capacidad según su tipo de amarre
    if (capacidad !== null) {
        let resultado;
        if (tipoAmarre === "lazo") {
            resultado = capacidad * capacidad * 9.72 * 0.75;
        } else if (tipoAmarre === "canasta") {
            resultado = capacidad * capacidad * 9.72 * 2;
        } else {
            resultado = capacidad * capacidad * 9.72;
        }

        // Mostramos los resultados en pantalla
        document.getElementById("resultado").innerText = `${resultado.toFixed(2)} Ton`;
    } else {
        document.getElementById("resultado").innerText = "Ingresa una capacidad válida.";
    }
}

// Función para parsear la capacidad
function parseCapacidad(capacidadInput) {
    try {
        // Intentamos evaluar la expresión para admitir cualquier formato numérico o fraccional
        return eval(capacidadInput);
    } catch (error) {
        return null;
    }
}

// Función para calcular la capacidad segura de trabajo en estrobos lazo doble
function capacidadSeguraAxialDoble() {
    // Obtenemos los valores de los campos del formulario
    let lazo = parseFloat(document.getElementById("lazo").value);
    let altura = parseFloat(document.getElementById("altura").value);
    let largo = parseFloat(document.getElementById("largo").value);

    // Validar el primer campo
    if (isNaN(lazo)) {
        mostrarError(lazoError, "Por favor, ingresa un valor numérico válido.");
        ocultarError(alturaError);
        ocultarError(largoError);
        return;
    } else {
        ocultarError(lazoError);
    }

    // Validar el segundo campo solo al hacer clic en calcular
    if (isNaN(altura)) {
        mostrarError(alturaError, "Por favor, ingresa un valor numérico válido.");
        return;
    } else {
        ocultarError(alturaError);
    }

    // Validar el tercer campo solo al hacer clic en calcular
    if (isNaN(largo)) {
        mostrarError(largoError, "Por favor, ingresa un valor numérico válido.");
        return;
    } else {
        ocultarError(largoError);
    }

    // Realizamos el cálculo
    const capacidadSegura = (((lazo * 3) / 4) * (altura / largo)) * 2;

    // Mostramos el resultado en pantalla
    document.getElementById("capacidadSeguraEstroboAxialAmarreDoble").innerHTML = capacidadSegura.toFixed(1) + " Ton";

    // Mostramos el proceso y fórmulas utilizadas
    mostrarProceso(lazo, altura, largo, capacidadSegura);
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(lazo, altura, largo, capacidadSegura) {
    const procesoDiv = document.getElementById("procesoDoble");
    
    // Detectar el idioma de la página
    const lang = document.documentElement.lang;
  
    if (lang === "es") {
      // Texto en español
      procesoDiv.innerHTML = `
    <h3>Proceso y Fórmula:</h3> <p>1. Obtenemos el valor de capacidad estrobo.</p>  
    <p class="formula">Fórmula = (Capacidad * 3 / 4) * (Altura / Largo) * 2</p> 
    <p class="formula"> = ${lazo} * ${3} / ${4} * ${altura} / ${largo} * ${2}</p> 
    <p class="formula">Capacidad ≈ ${capacidadSegura.toFixed(2)} Ton </p>
      `;
    } else if (lang === "en") {
      // Texto en inglés
      procesoDiv.innerHTML = `
    <h3>Process and Formula:</h3> 
    <p>1. We obtain the sling capacity value.</p> 
    <p class="formula">Formula = (Capacity * 3 / 4) * (Height / Length) * 2</p> 
    <p class="formula"> = ${lazo} * ${3} / ${4} * ${altura} / ${largo} * ${2}</p> 
    <p class="formula">Capacity ≈ ${capacidadSegura.toFixed(2)} Ton</p>
      `;
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

