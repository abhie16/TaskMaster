let userInput = document.querySelector(".task-input input");
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".btn-clear")
taskBox = document.querySelector(".task-box");

let editId;
let isEditedTask=false;

// getting localStorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});


function showTodo(filter){
    let li = "";

    if(todos){
        todos.forEach((todo, id) => {

            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all"){
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
            }
        });
    }
    taskBox.innerHTML = li || `You don't have any task here`;
}

showTodo("all");

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
    editId = taskId;
    isEditedTask = true;
    userInput.value = taskName;
}

function deleteTask(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener("click", () =>{
    todos.splice(0 , todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});

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
        if(!isEditedTask){
            if(!todos){
                //if todos isnt exist, pass an empty array to todos
                todos = [];
            }
           let taskInfo = {name: task, status:"pending"};
           todos.push(taskInfo); //adding new task to todos    
        }
        else{
            isEditedTask = false;
            todos[editId].name = task;
        } 

       userInput.value = ""; 
        localStorage.setItem("todo-list", JSON.stringify(todos));
       showTodo("all");
    }
})