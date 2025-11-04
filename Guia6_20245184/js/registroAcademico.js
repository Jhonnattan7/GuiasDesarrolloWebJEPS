
//Leyendo elementos DOM


const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
const btnViewEstudiante = document.querySelector("#idBtnMostrarEstudiantes");
const inputCarnet = document.querySelector("#inputCarnet");
const inputNombre = document.querySelector("#inputNombre");
const inputApellidos = document.querySelector("#inputApellidos");


function guardarEstudiante() {
    const carnet = inputCarnet.value.trim();
    const nombre = inputNombre.value.trim();
    const apellidos = inputApellidos.value.trim();
    const errores = validarDatos(carnet,nombre,apellidos)

    btnAddEstudiante.addEventListener("click",guardarEstudiante)

    if(errores.length>0){
        alert("Errores: \n "+ errores.join(","));
        return;
    }


    const alumnos=[];
    alumnos.push({carnet,nombre,apellidos})

    function guardarEstudiantes(estudiantes){
        localStorage.setItem("estudiantes",JSON.stringify(estudiantes));
    }

    function recuperarEstudiantes(){
        const data = localStorage.getItem("estudiantes");
        return data? JSON.parse(data):[]
    }
}

function validarDatos(carnet, nombre, apellidos){
    const errores=[];
    if(carnet.trim().length==0){
        errores.push("El carnet es obligatorio");
    }

    if(nombre.trim().length==0){
        errores.push("El nombre es requerido");
    }
    if(carnet.trim().length==0){
        errores.push("Los apellidos son requerido");
    }
    return errores;

}























