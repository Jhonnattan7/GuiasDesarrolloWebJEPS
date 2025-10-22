function aviso() {
    alert("Bienvenido al mundo JavaScript");
}

function confirmación() {
    let confirmacion = confirm("¿Desea salir de la Sesión?");
    alert(`Valor seleccionado ${confirmacion}`);
}

function capturarDatos() {
    let nombre = prompt("¿Cuál es su nombre?");
    let edad = prompt("¿Cuál es su edad?");
    alert(`Su nombre es ${nombre} y su edad ${edad}`);
}
