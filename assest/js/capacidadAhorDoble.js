// function calcularAngulo()
document.addEventListener("DOMContentLoaded", () => {
  // Asociamos los eventos de validación a cada campo
  const campos = [
    { id: "radio", errorId: "radioError" },
    { id: "largo", errorId: "largoError" },
    { id: "valor", errorId: "valorError" },
    { id: "diametro", errorId: "diametroError" },
    { id: "largo1", errorId: "largo1Error" },
    { id: "radio1", errorId: "radio1Error" },
    { id: "capacidad", errorId: "capacidadError" },
    { id: "angulo", errorId: "anguloError" }
  ];

  campos.forEach(campo => {
    const input = document.getElementById(campo.id);
    const errorElemento = document.getElementById(campo.errorId);
    input.addEventListener("input", () => validarCampo(input, errorElemento));
    input.addEventListener("blur", () => validarCampo(input, errorElemento));
  });
});

//Validamos los campos
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
function calcularAngulo() {
  let radio = parseFloat(document.getElementById("radio").value);
  let largo = parseFloat(document.getElementById("largo").value);

  if (!validarCampo(document.getElementById("radio"), document.getElementById("radioError")) ||
      !validarCampo(document.getElementById("largo"), document.getElementById("largoError"))) {
    return;
  }

  if (radio >= largo) {
    mostrarError(document.getElementById("radioError"), "El radio debe ser menor que el largo.");
    return;
  }

  ocultarError(document.getElementById("radioError"));
  ocultarError(document.getElementById("largoError"));

  const anguloRadianes = Math.acos(radio / largo);
  const anguloGrados = (anguloRadianes * 180) / Math.PI;

  document.getElementById("resultadoAngulo").textContent = anguloGrados.toFixed(2) + " °";
}

//Funcion para calcular unidades
function convertirUnidades() {
  const valor = parseFloat(document.getElementById("valor").value);
  const unidadesOrigen = document.getElementById("unidadesOrigen").value;
  const unidadesDestino = document.getElementById("unidadesDestino").value;
  const resultadoInput = document.getElementById("resultado");

  if (!validarCampo(document.getElementById("valor"), document.getElementById("valorError"))) {
    return;
  }

  let resultado = 0;

  const conversiones = {
    "milimetros": { "metros": 0.001, "centimetros": 0.1, "pulgadas": 0.03937 },
    "centimetros": { "metros": 0.01, "milimetros": 10, "pulgadas": 0.3937 },
    "metros": { "milimetros": 1000, "centimetros": 100, "pulgadas": 39.37 },
    "pulgadas": { "metros": 0.0254, "milimetros": 25.4 },
    "pies": { "metros": 0.3048 },
    "libras": { "kilogramos": 0.453592, "toneladas": 0.000453592 },
    "kilogramos": { "libras": 2.20462, "toneladas": 0.001 }
  };

  resultado = valor * (conversiones[unidadesOrigen]?.[unidadesDestino] || 0);

  resultadoInput.value = `${resultado.toFixed(2)} ${unidadesDestino}`;
}

// function calculoTensionAhorcadoDoble()
function calculoTensionAhorcadoDoble() {
  //Obtenemos los datos ingresados
  let diametroPerimetro = parseFloat(document.getElementById("diametro").value);
  let largoManiobra = parseFloat(document.getElementById("largo1").value);
  let radioManiobra = parseFloat(document.getElementById("radio1").value);
  let capacidadManiobra = parseFloat(document.getElementById("capacidad").value);
  let anguloManiobra = parseFloat(document.getElementById("angulo").value);

  //Validamos los campos
  if (!validarCampo(document.getElementById("diametro"), document.getElementById("diametroError")) ||
      !validarCampo(document.getElementById("largo1"), document.getElementById("largo1Error")) ||
      !validarCampo(document.getElementById("radio1"), document.getElementById("radio1Error")) ||
      !validarCampo(document.getElementById("capacidad"), document.getElementById("capacidadError")) ||
      !validarCampo(document.getElementById("angulo"), document.getElementById("anguloError"))) {
    return;
  }

  //Realizamos el calculo
  const calculoPerimetro = diametroPerimetro * Math.PI;
  const perdidaEstrobo = largoManiobra - calculoPerimetro;
  const anguloRadianes = Math.acos(radioManiobra / largoManiobra);
  const anguloManiobraDoble = (anguloRadianes * 180) / Math.PI;
  const capacidadBruta = capacidadManiobra * Math.sin(anguloRadianes);
  const capacidadReal = (capacidadBruta * 75) / 100;

  document.getElementById("capacidadRealAhorcadoDoble").innerHTML =
    capacidadReal.toFixed(2) + " Kg";

  mostrarProceso(
    diametroPerimetro,
    calculoPerimetro,
    perdidaEstrobo,
    anguloManiobraDoble,
    capacidadBruta,
    capacidadReal
  );
}

// Función para mostrar el proceso y fórmulas utilizadas
function mostrarProceso(
  diametroPerimetro,
  calculoPerimetro,
  perdidaEstrobo,
  anguloManiobraDoble,
  capacidadBruta,
  capacidadReal) {
  const procesoDiv = document.getElementById("procesoAhorcado");
  
  // Detectar el idioma de la página
  const lang = document.documentElement.lang;

  if (lang === "es") {
    // Texto en español
    procesoDiv.innerHTML = `
    <h3>Proceso y Formulas:</h3>
    <p>1. Obtenemos los valores de diámetro, largo, radio, capacidad, ángulo.</p>
    <p>2. Calculamos el perímetro del elemento (cañería o tubo):</p>
    <p class="formula">Perímetro = Diámetro * π</p>
    <p class="formula"> = ${diametroPerimetro} * ${Math.PI.toFixed(2)}</p>
    <p class="formula">Perímetro ≈ ${calculoPerimetro.toFixed(
      2
    )} Perdida Maniobra</p>
    <p>3. Calculamos el largo real de la maniobra:</p>
    <p class="formula">Largo Real = Perímetro - Largo de Maniobra</p>
    <p class="formula"> ≈ ${perdidaEstrobo.toFixed(2)}</p>
    <p>4. Calculamos el ángulo de maniobra:</p>
    <p class="formula">Ángulo = Cos<sup>-1</sup>(Radio - Largo)</p>
    <p class="formula"> ≈ ${anguloManiobraDoble.toFixed(2)}</p>
    <p>5. Calculamos la capacidad bruta:</p>
    <p class="formula">Capacidad Bruta = Seno Ángulo * Capacidad</p>
    <p class="formula"> ≈ ${capacidadBruta.toFixed(2)}</p>
    <p>6. Calculamos la capacidad real (considerando factor de seguridad del 75%):</p>
    <p class="formula">Capacidad Real = Capacidad Bruta * 75%</p>
    <p class="formula"> ≈ ${capacidadReal.toFixed(2)} Kg</p>
    `;
  } else if (lang === "en") {
    // Texto en inglés
    procesoDiv.innerHTML = `
    <h3>Formula and Process:</h3>
    <p>1. Obtain the values for diameter, length, radius, capacity, and angle.</p>
    <p>2. Calculate the perimeter of the element (pipe or tube):</p>
    <p class="formula">Perimeter = Diameter * π</p>
    <p class="formula"> = ${diametroPerimetro} * ${Math.PI.toFixed(2)}</p>
    <p class="formula">Perimeter ≈ ${calculoPerimetro.toFixed(2)} Loss of Maneuver</p>
    <p>3. Calculate the actual length of the maneuver:</p>
    <p class="formula">Actual Length = Perimeter - Maneuver Length</p>
    <p class="formula"> ≈ ${perdidaEstrobo.toFixed(2)}</p>
    <p>4. Calculate the maneuver angle:</p>
    <p class="formula">Angle = Cos<sup>-1</sup>(Radius - Length)</p>
    <p class="formula"> ≈ ${anguloManiobraDoble.toFixed(2)}</p>
    <p>5. Calculate the gross capacity:</p>
    <p class="formula">Gross Capacity = Sine Angle * Capacity</p>
    <p class="formula"> ≈ ${capacidadBruta.toFixed(2)}</p>
    <p>6. Calculate the real capacity (considering a safety factor of 75%):</p>
    <p class="formula">Real Capacity = Gross Capacity * 75%</p>
    <p class="formula"> ≈ ${capacidadReal.toFixed(2)} Kg</p>

    `;
  }

  // Mostrar el div de la imagen
  const imagenProcesoDiv = document.getElementById("imagenProceso");
  imagenProcesoDiv.style.display = "block";
}

// Función para ocultar el div de la imagen
function ocultarImagen() {
  const imagenProcesoDiv = document.getElementById("imagenProceso");
  imagenProcesoDiv.style.display = "none";
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

