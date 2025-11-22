// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// AGREGANDO FUNCIONES
const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;
    //validando que se haya seleccionado un elemento
    if (elemento != "") {
        // Metodo perteneciente al modal de boostrap
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

// creando newSelect
const newSelect = function () {
    // Creando elementos
    let addElemento = document.createElement("select");
    // creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    // creando option para el select
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    // creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    // creando texto para label
    labelElemento.textContent = tituloElemento.value;

    // Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-floating mb-3");

    // ORDEN CORRECTO: primero select, luego label
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    // Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    // Creando elementos
    let addElemento = document.createElement("input");
    // creando atributos para el nueveo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    //creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    //creando texto para label
    labelElemento.textContent = tituloElemento.value;

    //Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-check mb-3");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    //Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
    // Creando elementos de tipo = text, number, date y password
    let addElemento = newElemento === "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");

    //creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    // Solo agregar type si NO es textarea
    if (newElemento !== "textarea") {
        addElemento.setAttribute("type", newElemento);
    }

    //creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    //creando icono para el label
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    //creando texto para label
    labelElemento.textContent = tituloElemento.value;

    // Creando el elemento i como hijo del label, afterbegin le
    // indicamos que se creara antes de su primer hijo
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    //Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-floating mb-3");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    //Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonAddElemento.onclick = (e) => {
    // Prevenir el cierre automático del modal
    e.preventDefault();
    e.stopPropagation();
    
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        // Validar que no exista un elemento con el mismo ID
        if (document.getElementById(`id${nombreElemento.value}`)) {
            alert("Ya existe un elemento con ese ID. Por favor, use un nombre diferente.");
            return;
        }

        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }

        // Limpiar los campos
        tituloElemento.value = "";
        nombreElemento.value = "";
        
        // Cerrar el modal después de agregar el elemento
        modal.hide();
    } else {
        alert("Faltan campos por completar");
    }
};

// Función para validar el formulario dinámico
const validarFormulario = function() {
    const elementos = newForm.elements;
    let errores = [];
    let mensajeValidacion = "";
    
    if (elementos.length === 0) {
        alert("No hay elementos en el formulario para validar");
        return;
    }
    
    for (let i = 0; i < elementos.length; i++) {
        const elemento = elementos[i];
        const tipo = elemento.type;
        const id = elemento.id;
        
        // Validar campos de texto, email, password, date, number, color, textarea
        if (tipo === "text" || tipo === "email" || tipo === "password" || 
            tipo === "date" || tipo === "number" || tipo === "color" || 
            tipo === "textarea") {
            if (elemento.value.trim() === "") {
                errores.push(`El campo "${id}" está vacío`);
            }
        }
        
        // Validar radio buttons
        if (tipo === "radio") {
            const nombre = elemento.name || id;
            const radios = document.getElementsByName(nombre);
            let seleccionado = false;
            
            for (let j = 0; j < radios.length; j++) {
                if (radios[j].checked) {
                    seleccionado = true;
                    break;
                }
            }
            
            if (!seleccionado) {
                errores.push(`Debe seleccionar una opción en "${id}"`);
            }
        }
        
        // Validar checkbox
        if (tipo === "checkbox") {
            if (!elemento.checked) {
                errores.push(`El checkbox "${id}" no está marcado`);
            }
        }
        
        // Validar select
        if (elemento.nodeName === "SELECT") {
            if (elemento.selectedIndex === -1 || elemento.value === "") {
                errores.push(`Debe seleccionar una opción en "${id}"`);
            }
        }
    }
    
    // Mostrar resultados de validación
    if (errores.length > 0) {
        mensajeValidacion = "Errores encontrados:\n\n";
        errores.forEach((error, index) => {
            mensajeValidacion += `${index + 1}. ${error}\n`;
        });
        alert(mensajeValidacion);
    } else {
        alert("✓ Todos los campos del formulario están correctamente llenos");
    }
};

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    // Limpiando campos para los nuevos elementos
    tituloElemento.value = "";
    nombreElemento.value = "";
    // inicializando puntero en el campo del titulo para el control
    tituloElemento.focus();
});

// Crear botón de validación cuando el documento esté listo
document.addEventListener("DOMContentLoaded", () => {
    // Buscar si ya existe el botón
    let btnValidar = document.getElementById("idBtnValidar");
    
    if (!btnValidar) {
        // Crear el botón de validación
        btnValidar = document.createElement("button");
        btnValidar.setAttribute("type", "button");
        btnValidar.setAttribute("id", "idBtnValidar");
        btnValidar.setAttribute("class", "btn btn-success mt-3");
        btnValidar.textContent = "Validar Formulario";
        
        // Agregar el botón después del formulario
        const contenedorForm = newForm.parentElement;
        contenedorForm.appendChild(btnValidar);
        
        // Agregar evento al botón
        btnValidar.addEventListener("click", validarFormulario);
    }
});