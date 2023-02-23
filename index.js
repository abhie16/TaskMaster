let userInput = document.querySelector(".task-input input");
taskBox = document.querySelector(".task-box");

// getting localStorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo(){
    let li = "";

    if(todos){
        todos.forEach((todo, id) => {

            let isCompleted = todo.status == "completed" ? "checked" : "";

            li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" name="" id="${id}" ${isCompleted}>
                            <P class="${isCompleted}">${todo.name}</P>
                        </label>
                         <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id},'${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                                <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
        });
    }
    taskBox.innerHTML = li;
}

showTodo();

function showMenu(selectedTask){
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");

    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    });
}

function editTask(taskId, taskName){
    
}

function deleteTask(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}



function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }
    else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

userInput.addEventListener("keyup", e => {
    let task = userInput.value.trim();
    if(e.key == "Enter" && task){

       if(!todos){
            //if todos isnt exist, pass an empty array to todos
            todos = [];
       }

       userInput.value = "";
       let taskInfo = {name: task, status:"pending"};
       todos.push(taskInfo); //adding new task to todos
       localStorage.setItem("todo-list", JSON.stringify(todos));
       showTodo();
    }
})