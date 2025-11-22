// Función para cambiar el color de fondo
const cambiarColorFondo = function (event) {
    document.body.style.backgroundColor = event.target.value;
};

// Función para modificar el color de los titulos
const cambiarColorTitulos = function (event) {
    const colorSeleccionado = event.target.value;
    const titulos = document.querySelectorAll("h1");
    titulos.forEach(titulo => {
        titulo.style.color = colorSeleccionado;
    });
};

// Función para modificar el color de los parrafos
const cambiarColorParrafos = function (event) {
    const colorSeleccionado = event.target.value;
    const parrafos = document.querySelectorAll("p");
    parrafos.forEach(parrafo => {
        parrafo.style.color = colorSeleccionado;
    });
};

// Variable única para controlar el tamaño de letra
let contadorTamanio = 1;

const aumentarLetra = function () {
    contadorTamanio += 0.1; // Incremento más visible
    aplicarTamanioLetra();
};

const disminuirLetra = function () {
    // Evitar que el texto sea demasiado pequeño
    if (contadorTamanio > 0.3) {
        contadorTamanio -= 0.1;
        aplicarTamanioLetra();
    }
};

const aplicarTamanioLetra = function () {
    document.body.style.fontSize = `${contadorTamanio}em`;
    const parrafos = document.querySelectorAll("p");
    parrafos.forEach(parrafo => {
        parrafo.style.fontSize = `${contadorTamanio}em`;
    });
    const titulos = document.querySelectorAll("h1");
    titulos.forEach(titulo => {
        titulo.style.fontSize = `${contadorTamanio * 2}em`; // Los títulos más grandes
    });
};

const startDOM = () => {
    // Obteniendo la referencia del input cambiar fondo
    const buttonFondo = document.getElementById("idFondo");
    buttonFondo.value = "#ffffff";
    buttonFondo.addEventListener("input", cambiarColorFondo, false);

    // Obteniendo la referencia del input cambiar color de titulos
    const buttonTitulos = document.getElementById("idTitulos");
    buttonTitulos.value = "#000000";
    buttonTitulos.addEventListener("input", cambiarColorTitulos, false);

    // Obteniendo la referencia del input cambiar color de parrafos
    const buttonParrafos = document.getElementById("idParrafos");
    buttonParrafos.value = "#000000";
    buttonParrafos.addEventListener("input", cambiarColorParrafos, false);

    // Obteniendo las referencias de los botones
    const buttonAumentar = document.getElementById("idBtnAumentar");
    const buttonDisminuir = document.getElementById("idBtnDisminuir");

    buttonAumentar.addEventListener("click", aumentarLetra, false);
    buttonDisminuir.addEventListener("click", disminuirLetra, false);
};

// EJECUTAR la función cuando el DOM esté listo
window.addEventListener("DOMContentLoaded", startDOM);