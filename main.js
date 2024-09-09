let jsonData = null;
// сделать стандартное оформление одной группы
// подобрать эконки кнопок

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

function group_buttons(groupe_name){
    // add

}

function task_buttons(){
    let del_btn = document.createElement('button');
    del_btn.innerHTML = '<i class="bi bi-trash"></i>';

    // edit
    // del
}

function menu_buttons(){
    // save
    // open new
}

function new_list_modal(){ // or new groupe in list
    // modal : "Create new list.", "text input", "ok", "cancel"
}

function del_modal(){
    // "Do you realy want to del it"
}


function initial_buttons() {
    let workplace = document.getElementById('workplace');
    workplace.innerHTML = '';

    let new_list_button = document.createElement('button');
    new_list_button.innerText = 'Create new list'
    new_list_button.className = "btn";

    let list_input = document.createElement('input');
    list_input.addEventListener("change", inputHandler);
    list_input.type = 'file';

    workplace.appendChild(new_list_button);
    workplace.appendChild(list_input);
}

function main_workplace() {
    let workplace = document.getElementById('workplace');
    workplace.innerHTML = '';

    let list_name = document.createElement('h2');
    list_name.innerText = jsonData.name;

    let task_groups = document.createElement('div');
    task_groups.className = 'container d-flex flex-row';

    jsonData.groups.forEach(element => {
        let group = document.createElement('div');
        group.className = "container w-auto m-1";
        group.style.textAlign = 'center';
        let tytle = document.createTextNode(element.name);
        // tytle.style.textAlign = 'center';
        group.appendChild(tytle);
        group.style.backgroundColor = element.color;

        let task_list = document.createElement('div');
        task_list.style.textAlign = 'left';
        element.tasks.forEach(el => {
            let task = document.createElement('div');
            task.className = "form-check";

            let del_btn = document.createElement('button');
            del_btn.innerHTML = '<i class="bi bi-trash"></i>';
            

            let checkbox_str = document.createElement('input');
            checkbox_str.type = "checkbox";
            checkbox_str.checked = (el.done === 'true');
            checkbox_str.id = el.id;
            checkbox_str.className="form-check-input"
            task.appendChild(checkbox_str);

            let label_str = document.createElement('label');
            label_str.htmlFor = el.id;
            label_str.innerText = el.name;
            label_str.className = "form-check-label";

            
            task.appendChild(label_str);

            // desc
            //check
            task_list.appendChild(task);
        })

        //task list, checkboxes, del, redactor
        group.appendChild(task_list);
        task_groups.appendChild(group);

    });


    workplace.appendChild(list_name);
    workplace.appendChild(task_groups);
}

if (jsonData == null) initial_buttons();
else main_workplace();