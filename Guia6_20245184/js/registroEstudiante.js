//Expresiones regulares para usarlas  en los campos adecuados del formulraio
const regexCarnet = /^[A-Z]{2}\d{3}$/;
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const regexDUI = /^\d{8}-\d{1}$/;
const regexNIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexEdad = /^\d+$/;

const inputCarnet = document.getElementById("idTxtCarnet");
const inputNombre = document.getElementById("idTxtNombre");
const inputDUI = document.getElementById("idTxtDUI");
const inputNIT = document.getElementById("idTxtNIT");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputCorreo = document.getElementById("idTxtCorreo");
const inputEdad = document.getElementById("idTxtEdad");

const buttonValidar = document.getElementById("idBtnValidar");
const buttonRegistrar = document.getElementById("idBtnRegistrar");
const buttonLimpiar = document.getElementById("idBtnLimpiar");
const buttonMostrar = document.getElementById("idBtnMostrar");

const notificacion = document.getElementById("idNotificacion");
const mensaje = document.getElementById("idMensaje");
const toast = new bootstrap.Toast(notificacion);

let arrayEstudiantes = [];

const validarCampo = (input, regex) => {
    const valor = input.value.trim();
    const esValido = regex.test(valor);

    if (esValido) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }

    return esValido;
};

const validarFormulario = () => {
    let esValido = true;
    esValido = validarCampo(inputCarnet, regexCarnet) && esValido;
    esValido = validarCampo(inputNombre, regexNombre) && esValido;
    esValido = validarCampo(inputDUI, regexDUI) && esValido;
    esValido = validarCampo(inputNIT, regexNIT) && esValido;
    esValido = validarCampo(inputFechaNacimiento, regexFecha) && esValido;
    esValido = validarCampo(inputCorreo, regexCorreo) && esValido;
    esValido = validarCampo(inputEdad, regexEdad) && esValido;

    return esValido;
};

const mostrarNotificacion = (mensajeTexto, tipo = "success") => {
    notificacion.classList.remove("text-bg-success", "text-bg-danger", "text-bg-warning", "text-bg-info");
    notificacion.classList.add(`text-bg-${tipo}`);
    mensaje.innerHTML = mensajeTexto;
    toast.show();
};

const limpiarFormulario = () => {
    inputCarnet.value = "";
    inputNombre.value = "";
    inputDUI.value = "";
    inputNIT.value = "";
    inputFechaNacimiento.value = "";
    inputCorreo.value = "";
    inputEdad.value = "";

    const inputs = [inputCarnet, inputNombre, inputDUI, inputNIT, inputFechaNacimiento, inputCorreo, inputEdad];
    inputs.forEach(input => {
        input.classList.remove("is-valid", "is-invalid");
    });

    inputCarnet.focus();
};

const registrarEstudiante = () => {
    if (validarFormulario()) {
        const estudiante = {
            carnet: inputCarnet.value.trim(),
            nombre: inputNombre.value.trim(),
            dui: inputDUI.value.trim(),
            nit: inputNIT.value.trim(),
            fechaNacimiento: inputFechaNacimiento.value.trim(),
            correo: inputCorreo.value.trim(),
            edad: inputEdad.value.trim()
        };

        arrayEstudiantes.push(estudiante);
        mostrarNotificacion("Estudiante registrado exitosamente", "success");
        limpiarFormulario();
    } else {
        mostrarNotificacion("Por favor, corrija los errores en el formulario", "danger");
    }
};

const generarFilasEstudiantes = () => {
    let filas = "";
    let contador = 1;

    arrayEstudiantes.forEach((estudiante, index) => {
        filas += `
        <tr>
            <td class="text-center fw-bold">${contador}</td>
            <td>${estudiante.carnet}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.dui}</td>
            <td>${estudiante.nit}</td>
            <td>${estudiante.fechaNacimiento}</td>
            <td>${estudiante.correo}</td>
            <td class="text-center">${estudiante.edad}</td>
            <td class="text-center">
                <button onclick="editarEstudiante(${index})" type="button" class="btn btn-sm btn-primary" title="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button onclick="eliminarEstudiante(${index})" type="button" class="btn btn-sm btn-danger" title="Eliminar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>
        `;
        contador++;
    });

    return filas;
};

const mostrarEstudiantes = () => {
    if (arrayEstudiantes.length === 0) {
        document.getElementById("idTablaEstudiantes").innerHTML = `
            <div class="alert alert-info" role="alert">
                <i class="bi bi-info-circle"></i> No hay estudiantes registrados todavía.
            </div>
        `;
        return;
    }

    const tabla = `
    <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <thead class="table-dark">
                <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col" class="text-center">Carnet</th>
                    <th scope="col" class="text-center">Nombre Completo</th>
                    <th scope="col" class="text-center">DUI</th>
                    <th scope="col" class="text-center">NIT</th>
                    <th scope="col" class="text-center">Fecha Nac.</th>
                    <th scope="col" class="text-center">Correo</th>
                    <th scope="col" class="text-center">Edad</th>
                    <th scope="col" class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${generarFilasEstudiantes()}
            </tbody>
        </table>
    </div>
    `;

    document.getElementById("idTablaEstudiantes").innerHTML = tabla;
};

const eliminarEstudiante = (index) => {
    if (confirm("¿Está seguro de eliminar este estudiante?")) {
        arrayEstudiantes.splice(index, 1);
        mostrarEstudiantes();
        mostrarNotificacion("Estudiante eliminado correctamente", "warning");
    }
};

const editarEstudiante = (index) => {
    const estudiante = arrayEstudiantes[index];
    inputCarnet.value = estudiante.carnet;
    inputNombre.value = estudiante.nombre;
    inputDUI.value = estudiante.dui;
    inputNIT.value = estudiante.nit;
    inputFechaNacimiento.value = estudiante.fechaNacimiento;
    inputCorreo.value = estudiante.correo;
    inputEdad.value = estudiante.edad;

    validarFormulario();
    arrayEstudiantes.splice(index, 1);
    mostrarEstudiantes();
    mostrarNotificacion("Edite los datos y presione 'Registrar Estudiante'", "info");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    inputCarnet.focus();
};

inputCarnet.addEventListener("blur", () => validarCampo(inputCarnet, regexCarnet));
inputNombre.addEventListener("blur", () => validarCampo(inputNombre, regexNombre));
inputDUI.addEventListener("blur", () => validarCampo(inputDUI, regexDUI));
inputNIT.addEventListener("blur", () => validarCampo(inputNIT, regexNIT));
inputFechaNacimiento.addEventListener("blur", () => validarCampo(inputFechaNacimiento, regexFecha));
inputCorreo.addEventListener("blur", () => validarCampo(inputCorreo, regexCorreo));
inputEdad.addEventListener("blur", () => validarCampo(inputEdad, regexEdad));

buttonValidar.onclick = () => {
    if (validarFormulario()) {
        mostrarNotificacion("¡Todos los campos son válidos! Puede registrar al estudiante.", "success");
    } else {
        mostrarNotificacion("Hay errores en el formulario. Por favor, revise los campos marcados.", "danger");
    }
};

buttonRegistrar.onclick = () => {
    registrarEstudiante();
};

buttonLimpiar.onclick = () => {
    limpiarFormulario();
    mostrarNotificacion("Formulario limpiado", "info");
};

buttonMostrar.onclick = () => {
    mostrarEstudiantes();
};

limpiarFormulario();
