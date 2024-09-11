let jsonData = null;

function inputHandler(event) {
    let reader = new FileReader();
    reader.onload = onReadLoad;
    reader.readAsText(event.target.files[0]);
}

function onReadLoad(event) {
    let data = JSON.parse(event.target.result);
    jsonData = data;

    mainWorkplace();
}

function newList() {
    let newListName = prompt('Enter the TO-DO list name: ', "New TO-DO list");
    if (newListName != null){
        jsonData = {
            name: `${newListName}`,
            tasks: []
        }

        mainWorkplace();
    }
    
}

function saveTaskFunc() {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: 'application/json',
    });

    let a = document.createElement('a');
    let url = URL.createObjectURL(blob);
    a.href = url;
    a.download = `${jsonData.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function addTaskFunc() {
    let newTask = {}

    newTask.name = prompt('Task name.', "New task");
    newTask.description = prompt('Task description.', "");
    newTask.id = jsonData.tasks.length;
    newTask.status = "not done";

    jsonData.tasks.push(newTask);

    mainWorkplace();
}

function editTaskFunc(id, name, desc) {
    jsonData.tasks[id].name = name;
    jsonData.tasks[id].description = desc;
    mainWorkplace();
}

function editTaskModal(id) {
    let editQ1 = prompt('Task name.', jsonData.tasks[id].name);
    let editQ2 = prompt('Task description.', jsonData.tasks[id].description);
    editTaskFunc(id, editQ1 != null ? editQ1 : jsonData.tasks[id].name, editQ2 != null ? editQ2 : jsonData.tasks[id].description);
}

function delTaskFunc(id) {
    jsonData.tasks.splice(id, 1);
    mainWorkplace();
}

function delTaskFuncModal(id) {
    let delQ = confirm("Are you sure you want to delete this task?");
    if (delQ == true) delTaskFunc(id);
}


function changeStatus(id) {
    jsonData.tasks[id].status = jsonData.tasks[id].status == "done" ? "not done" : "done";
    mainWorkplace();
}

let oneTaskButtons = (id) => {
    let btns = document.createElement("div");

    let editBtn = document.createElement("button");
    editBtn.className = "btn btn-light";
    editBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/></svg>';
    editBtn.addEventListener("click", () => editTaskModal(id));
    btns.appendChild(editBtn);

    let delBtn = document.createElement("button");
    delBtn.className = "btn btn-light";
    delBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>';
    delBtn.addEventListener("click", () => delTaskFuncModal(id));
    btns.appendChild(delBtn);

    return btns;
};

let oneTask = (element) => {
    let task = document.createElement("div");
    task.className = "task";

    let statusBtn = document.createElement("button");
    statusBtn.className = element.status == "done" ? "btn btn-success" : "btn btn-warning";
    statusBtn.innerHTML = element.status == "done" ?
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>'
        :
        '<svg width="16" height="16"></svg>'
    statusBtn.addEventListener('click', () => { changeStatus(element.id) });
    task.appendChild(statusBtn);

    let txtContainer = document.createElement("span");
    txtContainer.className = "txt-container";

    let tytle = document.createElement("h5");
    tytle.innerText = element.name;
    txtContainer.appendChild(tytle);

    let desc = document.createElement("h7");
    desc.innerText = element.description;
    txtContainer.appendChild(desc);

    task.appendChild(txtContainer);

    let task_buttons = oneTaskButtons(element.id);
    task.appendChild(task_buttons);

    return task;
};

function initial_buttons() {
    let workplace = document.getElementById("workplace");
    workplace.innerHTML = "";
    workplace.style.display = "flex";
    workplace.style.flexDirection = "column"
    workplace.style.alignItems = "center";

    let newListBtn = document.createElement("button");
    newListBtn.innerText = "Create new list";
    newListBtn.className = "btn btn-lg btn-outline btn-outline-dark";
    newListBtn.addEventListener("click", newList)

    
    let listInput = document.createElement("input");
    listInput.addEventListener("change", inputHandler);
    listInput.type = "file";
    listInput.accept = ".json";
    listInput.id = "json-input";

    let inputBtn = document.createElement("span");
    inputBtn.innerText = "Add json";
    inputBtn.className = "btn btn-lg btn-outline btn-outline-dark";

    inputBtn.onclick = (event) => {
        document.getElementById("json-input").click();
    }



    workplace.appendChild(newListBtn);
    workplace.appendChild(document.createTextNode("OR"));
    workplace.appendChild(listInput);
    workplace.appendChild(inputBtn);
}

let listButtons = () => {
    let btnDiv = document.createElement("div");
    btnDiv.className = "list-buttons";

    let saveBtn = document.createElement('button')
    saveBtn.innerText = "Save list";
    saveBtn.className = "btn btn-primary"
    saveBtn.addEventListener("click", saveTaskFunc);
    saveBtn.style.marginRight = "8px";
    btnDiv.appendChild(saveBtn);

    let clearBtn = document.createElement('button')
    clearBtn.innerText = "Clear list";
    clearBtn.className = "btn btn-secondary"
    clearBtn.addEventListener("click", () => {
        jsonData = null;
        initial_buttons();
    });
    btnDiv.appendChild(clearBtn);

    return btnDiv;
}

let mainWorkplace = () => {
    let workplace = document.getElementById("workplace");
    workplace.innerHTML = "";

    let lstBtns = listButtons();
    workplace.appendChild(lstBtns);

    let listTytle = document.createElement("div");
    listTytle.className = "list-tytle";

    let first = document.createElement('div');
    listTytle.appendChild(first);

    let listName = document.createElement("h3");
    listName.className = "tytle";
    listName.innerText = jsonData.name;
    listTytle.appendChild(listName);

    let addBtn = document.createElement("button");
    addBtn.className = "btn btn-light";
    addBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/></svg>';
    addBtn.addEventListener("click", () => addTaskFunc());
    workplace.appendChild(addBtn);
    listTytle.appendChild(addBtn);

    workplace.appendChild(listTytle);
    
    let list = document.createElement("div");
    for (let i = 0; i < jsonData.tasks.length; i++) {
        jsonData.tasks[i].id = i;

        list.appendChild(oneTask(jsonData.tasks[i]));
    }
    workplace.appendChild(list);
};

if (jsonData == null) initial_buttons();
else mainWorkplace();