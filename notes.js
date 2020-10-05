const lists = document.getElementById("list");
const modal = document.getElementById("modal");

const inputTitle = document.getElementById("inputTitle");
const inputSubTitle = document.getElementById("inputSubTitle");
const titleDOM = document.getElementById("title");
const titleFail = document.getElementById("titleFail");
const subtitleDOM = document.getElementById("subtitle");

const contentFail = document.getElementById("contentFail");
const inputHeader = document.getElementById("inputHeader");
const inputContent = document.getElementById("inputContent");

const inputModal = document.getElementById("inputModal");
const textAreaModal = document.getElementById("textAreaModal");

const menuPrincipal = document.getElementById("menuPrincipal");

const inputApellidos = document.getElementById("inputApellidos");
const inputOrden = document.getElementById("inputOrden");
const alumno = document.getElementById("alumno");
const alumnoFail = document.getElementById("alumnoFail");

document.getElementById("fecha").innerHTML = new Date().toISOString().slice(0, 10);

const menuControl = () => {
    menuPrincipal.classList.toggle("is-hidden");
}

const addTitle = () => {
    const title = inputTitle.value;
    if (!title) {
        titleFail.innerHTML = "Debe insertar un título";
    } else {
        inputTitle.value = "";
        titleFail.innerHTML = "";
        titleDOM.innerHTML = title;
    }
}

const addSubtitle = () => {
    const subtitle = inputSubTitle.value;
    inputSubTitle.value = "";
    subtitleDOM.innerHTML = subtitle;
}

const addAlumno = () => {
    const apellidos = inputApellidos.value;
    const orden = inputOrden.value;
    if (apellidos && orden) {
        inputApellidos.value = "";
        inputOrden.value = "";
        alumnoFail.innerHTML = "";
        alumno.innerHTML = `${apellidos} N° ${orden}`;
    } else {
        alumnoFail.innerHTML = "Se deben insertar todos los datos.";
    }
}

const addNote = () => {
    const header = inputHeader.value;
    const content = inputContent.value;
    if (!content) {
        contentFail.innerHTML = "Es necesario un Contenido";
    } else {
        const item = { header, content };
        inputHeader.value = "";
        inputContent.value = "";
        addNoteToDom(item);
    }
}

const deleteNote = (id) => {
    const myobj = document.getElementById(id);
    const r = confirm("¿Estás seguro de borrar la nota?");
    if (r == true) {
        myobj.remove();
    }
}

const guidGenerator = () => {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const showModalToEdit = (data) => {
    modal.classList.toggle("is-active");
    const idInput = document.getElementById("code");
    idInput.value = data.id;
    inputModal.value = data.header || "";
    textAreaModal.value = data.content;
}

const cancelUpdate = () => {
    modal.classList.toggle("is-active");
}

const confirmNote = () => {
    const idInput = document.getElementById("code");
    const id = idInput.value;
    const header = inputModal.value;
    const content = textAreaModal.value;
    const note = document.getElementById(id);
    if (header) {
        note.innerHTML = `
        <article class="message is-dark note">
            <div class="message-header">
                <h3>${header}</h3>
                <div class="tools with-body">
                    <button class="btnedit" onclick="showModalToEdit({id: '${id}', header: '${header}', content: '${content}'})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btndelete" onclick="deleteNote('${id}')"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div class="message-body">
                <p>${content}</p>
            </div>
        </article>
    `;
    } else {
        note.innerHTML = `
        <article class="message is-dark note">
            <div class="message-body">
                <div class="tools only-body">
                    <button class="btnedit" onclick="showModalToEdit({id: '${id}', content: '${content}'})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btndelete" onclick="deleteNote('${id}')"><i class="fas fa-trash-alt"></i></button>
                </div>
                <p>${content}</p>
            </div>
        </article>
        `;
    }
    modal.classList.toggle("is-active");
}

const addNoteToDom = (item) => {
    const id = guidGenerator();
    const note = document.createElement("div");
    note.setAttribute("id", id);
    if (item.header) {
        note.innerHTML = `
        <article class="message is-dark note">
            <div class="message-header">
                <h3>${item.header}</h3>
                <div class="tools with-body">
                    <button class="btnedit" onclick="showModalToEdit({id: '${id}', header: '${item.header}', content: '${item.content}'})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btndelete" onclick="deleteNote('${id}')"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div class="message-body">
                <p>${item.content}</p>
            </div>
        </article>
    `;
    } else {
        note.innerHTML = `
        <article class="message is-dark note">
            <div class="message-body">
                <div class="tools only-body">
                    <button class="btnedit" onclick="showModalToEdit({id: '${id}', content: '${item.content}'})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btndelete" onclick="deleteNote('${id}')"><i class="fas fa-trash-alt"></i></button>
                </div>
                <p>${item.content}</p>
            </div>
        </article>
        `;
    }
    lists.appendChild(note);
}