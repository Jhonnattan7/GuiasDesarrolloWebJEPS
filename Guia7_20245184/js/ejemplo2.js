// Obteniendo la referencia de los elementos
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
const bodyModal = document.getElementById("idBodyModal");
const modalLabel = document.getElementById("modalLabel");

// Función para validar email con expresión regular
const validarEmail = function(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

// Función para validar que la fecha no supere la fecha actual
const validarFecha = function(fecha) {
    const fechaIngresada = new Date(fecha);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    return fechaIngresada <= fechaActual;
};

// Función para crear tabla usando solo DOM
const crearTablaDOM = function(datos) {
    // Limpiar el contenido del modal
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }
    
    // Crear tabla
    const table = document.createElement("table");
    table.setAttribute("class", "table table-striped table-bordered");
    
    // Crear tbody
    const tbody = document.createElement("tbody");
    
    // Agregar filas con datos
    datos.forEach(dato => {
        const tr = document.createElement("tr");
        
        // Celda para el label
        const tdLabel = document.createElement("td");
        const strongLabel = document.createElement("strong");
        strongLabel.textContent = dato.label;
        tdLabel.appendChild(strongLabel);
        
        // Celda para el valor
        const tdValor = document.createElement("td");
        tdValor.textContent = dato.valor;
        
        tr.appendChild(tdLabel);
        tr.appendChild(tdValor);
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    bodyModal.appendChild(table);
};

// Función principal de validación
const validarFormulario = function() {
    let errores = [];
    
    // 1. Obtener valores de los campos
    const nombre = document.getElementById("idNombre").value.trim();
    const apellidos = document.getElementById("idApellidos").value.trim();
    const fechaNac = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value.trim();
    const password = document.getElementById("idPassword").value;
    const passwordRepetir = document.getElementById("idPasswordRepetir").value;
    
    // 2. Validar que los campos no estén vacíos
    if (nombre === "") {
        errores.push("El campo 'Nombres' no puede estar vacío");
    }
    if (apellidos === "") {
        errores.push("El campo 'Apellidos' no puede estar vacío");
    }
    if (fechaNac === "") {
        errores.push("Debe seleccionar una fecha de nacimiento");
    }
    if (correo === "") {
        errores.push("El campo 'Correo electrónico' no puede estar vacío");
    }
    if (password === "") {
        errores.push("El campo 'Contraseña' no puede estar vacío");
    }
    if (passwordRepetir === "") {
        errores.push("El campo 'Repetir Contraseña' no puede estar vacío");
    }
    
    // 3. Validar fecha de nacimiento no supere la fecha actual
    if (fechaNac !== "" && !validarFecha(fechaNac)) {
        errores.push("La fecha de nacimiento no puede ser mayor a la fecha actual");
    }
    
    // 4. Validar correo electrónico con expresión regular
    if (correo !== "" && !validarEmail(correo)) {
        errores.push("El formato del correo electrónico no es válido");
    }
    
    // 5. Validar que las contraseñas sean iguales
    if (password !== "" && passwordRepetir !== "" && password !== passwordRepetir) {
        errores.push("Las contraseñas no coinciden");
    }
    
    // 6. Verificar que al menos un interés esté seleccionado
    const checkProgramacion = document.getElementById("idCkProgramacion").checked;
    const checkBD = document.getElementById("idCkBD").checked;
    const checkRedes = document.getElementById("idCkRedes").checked;
    const checkSeguridad = document.getElementById("idCkSeguridad").checked;
    
    if (!checkProgramacion && !checkBD && !checkRedes && !checkSeguridad) {
        errores.push("Debe seleccionar al menos un interés");
    }
    
    // 7. Verificar que se seleccione una carrera
    const radios = document.getElementsByName("idRdCarrera");
    let carreraSeleccionada = false;
    let textoCarrera = "";
    
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            carreraSeleccionada = true;
            textoCarrera = document.querySelector(`label[for="${radios[i].id}"]`).textContent;
            break;
        }
    }
    
    if (!carreraSeleccionada) {
        errores.push("Debe seleccionar una carrera");
    }
    
    // 8. Verificar que se seleccione un país
    const selectPais = document.getElementById("idCmPais");
    const paisSeleccionado = selectPais.selectedIndex > 0;
    
    if (!paisSeleccionado) {
        errores.push("Debe seleccionar un país de origen");
    }
    
    // Si hay errores, mostrarlos
    if (errores.length > 0) {
        let mensajeError = "Por favor corrija los siguientes errores:\n\n";
        errores.forEach((error, index) => {
            mensajeError += `${index + 1}. ${error}\n`;
        });
        alert(mensajeError);
        return;
    }
    
    // Si no hay errores, preparar datos para mostrar en el modal
    const intereses = [];
    if (checkProgramacion) intereses.push("Programación");
    if (checkBD) intereses.push("Base de Datos");
    if (checkRedes) intereses.push("Inteligencia artificial");
    if (checkSeguridad) intereses.push("Seguridad informática");
    
    const textoPais = selectPais.options[selectPais.selectedIndex].text;
    
    const datos = [
        { label: "Nombres:", valor: nombre },
        { label: "Apellidos:", valor: apellidos },
        { label: "Fecha de Nacimiento:", valor: fechaNac },
        { label: "Correo Electrónico:", valor: correo },
        { label: "Intereses:", valor: intereses.join(", ") },
        { label: "Carrera:", valor: textoCarrera },
        { label: "País de Origen:", valor: textoPais }
    ];
    
    // Cambiar título del modal
    modalLabel.textContent = "Datos del Registro";
    
    // Crear tabla con los datos usando solo DOM
    crearTablaDOM(datos);
    
    // Mostrar el modal
    modal.show();
};

// Agregando evento al botón
button.onclick = () => {
    validarFormulario();
};