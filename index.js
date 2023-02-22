let userInput = document.querySelector(".task-input input");

userInput.addEventListener("keyup", e => {
    let task = userInput.value.trim();
    if(e.key == "Enter" && task){
        console.log(task);
    }
})