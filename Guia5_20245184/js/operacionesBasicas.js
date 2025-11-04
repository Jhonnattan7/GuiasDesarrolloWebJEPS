//Accedemos al párrafo que nos permitirá imprimir el resultado
let parrafo = document.querySelector("#idParrafo");
console.log(parrafo);

//Accedemos a cada boton por medio de la API DOM
let btnSumar = document.querySelector("#idBtnSumar");
let btnRestar = document.querySelector("#idBtnRestar");
let btnMultiplicar = document.querySelector("#idBtnMultiplicar");
let btnDividir = document.querySelector("#idBtnDividir");

//Agregamos el evento click a los botones, adicionalmente
//se le asigna la función que realizará la operación
btnSumar.addEventListener("click", sumar);
btnRestar.addEventListener("click", restar);
btnMultiplicar.addEventListener("click", multiplicar);
btnDividir.addEventListener("click", dividir);

//Creamos la variable que tendrá el valor del resultado de la operación matemática
let resultado;

//Función de operaciones
function sumar() {
  let numero1 = parseFloat(prompt("Ingrese el primer numero a sumar"));
  let numero2 = parseFloat(prompt("Ingrese el segundo numero a sumar"));
  resultado = numero1 + numero2;
  parrafo.innerHTML = `${numero1} + ${numero2} = ${resultado}`;
}
function restar() {
    let numero2 = parseFloat(prompt("Ingrese el segundo numero a restar"));
    resultado = numero1 - numero2;
    parrafo.innerHTML = `${numero1} - ${numero2} = ${resultado}`;
}

function multiplicar() {
    let numero1 = parseFloat(prompt("Ingrese el primer numero a multiplicar"));
    let numero2 = parseFloat(prompt("Ingrese el segundo numero a multiplicar"));
    resultado = numero1 * numero2;
    parrafo.innerHTML = `${numero1} * ${numero2} = ${resultado}`;
}

function dividir() {
    let numero1 = parseFloat(prompt("Ingrese el primer numero a dividir"));
    let numero2 = parseFloat(prompt("Ingrese el segundo numero a dividir"));
    if (numero2 != 0) {
        resultado = numero1 / numero2;
        mensaje = `${numero1} / ${numero2} = ${resultado}`;
    } else {
        mensaje = `El valor ${numero1} / ${numero2} no se puede dividir`;
    }
    parrafo.innerHTML = mensaje;
}
