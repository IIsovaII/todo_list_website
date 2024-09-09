let jsonData = null;

function inputHandler(event) {
    let reader = new FileReader();
    reader.onload = onReadLoad;
    reader.readAsText(event.target.files[0]);
}

function onReadLoad(event) {
    let data = JSON.parse(event.target.result);
    jsonData = data;

    main_workplace();
}

function newList() { } // ?

function saveTaskFunc() {
    //
}

function addTaskFunc() {
    let newTask = {}
    
    newTask.name = prompt('Task name.', "new task");
    newTask.description = prompt('Task description.', "");
    newTask.id = jsonData.tasks.length;

    jsonData.tasks.push(newTask);

    main_workplace();
}

function editTaskFunc(id, name, desc) {
    jsonData.tasks[id].name = name;
    jsonData.tasks[id].description = desc;
    main_workplace();
}

function editTaskModal(id) {
    let editQ1 = prompt('Task name.', jsonData.tasks[id].name);
    let editQ2 = prompt('Task description.', jsonData.tasks[id].description);
    editTaskFunc(id, editQ1 != null ? editQ1 : jsonData.tasks[id].name, editQ2 != null ? editQ2 : jsonData.tasks[id].description);
}

function delTaskFunc(id) {
    jsonData.tasks.splice(id, 1);
    main_workplace();
}

function delTaskFuncModal(id) {
    let delQ = confirm("Are you sure you want to delete this task?");
    if (delQ == true) delTaskFunc(id);
}

/*function delTaskFuncModal() {
    // modal
    let delModal = document.createElement("div");
    delModal.className = "modal fade";
    delModal.tabIndex = "-1";

    // modal -> modal-dialog
    let delModalDialog = document.createElement("div");
    delModalDialog.className = "modal-dialog";
    delModal.appendChild(delModalDialog);

    // modal-dialog -> modal-content
    let delModalContent = document.createElement("div");
    delModalContent.className = "modal-content";

    // modal-content -> header
    let header = document.createElement("div");
    header.className = "modal-header";
    header.innerHTML = `<h5 class="modal-title">Delete</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
    delModalContent.appendChild(header);

    // modal-content -> body
    let body = document.createElement("div");
    body.className = "modal-body";
    body.innerHTML = "<p>Are you sure you want to delete this task?</p>";
    delModalContent.appendChild(body);

    // modal-content -> footer
    let footer = document.createElement("div");
    footer.className = "modal-footer";

    // footer -> close
    let closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "btn btn-secondary";
    closeBtn["data-bs-dismiss"] = "modal";
    closeBtn.innerText = "Cancel";
    footer.appendChild(closeBtn);

    // footer -> ok
    let okBtn = document.createElement("button");
    okBtn.type = "button";
    okBtn.className = "btn btn-primary";
    closeBtn.addEventListener("click", delTaskFunc);
    closeBtn.innerText = "Ok";
    footer.appendChild(okBtn);

    delModalContent.appendChild(footer);
    delModalDialog.appendChild(delModalContent);

    // нужно добавить модальное окно на страницу - оно будет появлять только по нажатию кнопки
    // id +
    // кнопку вызова переделать согласно id
    return delModal;
}*/

function changeStatus() {
    //
}

// можно передавать целый таск
let oneTaskButtons = (id) => {
    let btns = document.createElement("div");

    let editBtn = document.createElement("button");
    editBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/></svg>';
    editBtn.addEventListener("click", () => editTaskModal(id));
    btns.appendChild(editBtn);

    let delBtn = document.createElement("button");
    delBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>';
    delBtn.addEventListener("click", () => delTaskFuncModal(id));
    btns.appendChild(delBtn);

    //<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    //   Launch demo modal
    //   </button>

    return btns;
};

let oneTask = (element) => {
    let task = document.createElement("div");

    let tytle = document.createElement("h3");
    tytle.innerText = element.name;
    task.appendChild(tytle);

    let task_buttons = oneTaskButtons(element.id);
    task.appendChild(task_buttons);

    let desc = document.createElement("h5");
    desc.innerText = element.description;
    task.appendChild(desc);

    let statusBtn = document.createElement("button");

    return task;
};

function initial_buttons() {
    let workplace = document.getElementById("workplace");
    workplace.innerHTML = "";

    let new_list_button = document.createElement("button");
    new_list_button.innerText = "Create new list";
    new_list_button.className = "btn";

    let list_input = document.createElement("input");
    list_input.addEventListener("change", inputHandler);
    list_input.type = "file";

    workplace.appendChild(new_list_button);
    workplace.appendChild(list_input);
}

let main_workplace = () => {
    let workplace = document.getElementById("workplace");
    workplace.innerHTML = "";

    let addBtn = document.createElement("button");
    addBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>';
    addBtn.addEventListener("click", () => addTaskFunc());
    workplace.appendChild(addBtn);

    let list_name = document.createElement("h2");
    list_name.innerText = jsonData.name;
    workplace.appendChild(list_name);

    let list = document.createElement("div");
    for (let i = 0; i < jsonData.tasks.length; i++) {
        jsonData.tasks[i].id = i;

        list.appendChild(oneTask(jsonData.tasks[i]));
    }
    workplace.appendChild(list);
};

if (jsonData == null) initial_buttons();
else main_workplace();