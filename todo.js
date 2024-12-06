const inputBox = document.getElementById('inputBox')
const addBtn = document.getElementById('addBtn')
const todoList = document.getElementById('todoList')

let editTodo = null

// function to add todo---
const addTodo = ()=>{
    const inputText = inputBox.value.trim()
    if(inputText.length <= 0){
        alert("you must write something in your To Do")
        return false;
    }

    if(addBtn.value === "Edit"){
        // Passing the original text to editLocalTodos function before edit it in the todoList--
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML)
        editTodo.target.previousElementSibling.innerHTML = inputText
        addBtn.value = "Add"
        inputBox.value = ""
    }
    else{
    // creating p tag---
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    
    // creating edit btn---
    const editBtn = document.createElement("button")
    editBtn.innerText = "Edit"
    editBtn.classList.add("btn", "editBtn")
    li.appendChild(editBtn)

    // creating delete btn---
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Remove"
    deleteBtn.classList.add("btn", "deleteBtn")
    li.appendChild(deleteBtn)
    

    todoList.appendChild(li);
    inputBox.value = ""

    saveLocalTodos(inputText)
    }
}

// function to update (Edit/delete) todo---
const updateTodo = (e)=>{
    if(e.target.innerHTML === "Remove"){
    todoList.removeChild(e.target.parentElement)
    deleteLocalTodos(e.target.parentElement)
    }
    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus()
        addBtn.value = "Edit";
        editTodo = e
    }
}

// function to save local todo ---
const saveLocalTodos = (todo) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

// function to get local todo --- 
const getLocalTodos = () => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
        todos.forEach(todo => {

            // creating p tag---
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

    
            // creating edit btn---
            const editBtn = document.createElement("button")
            editBtn.innerText = "Edit"
            editBtn.classList.add("btn", "editBtn")
            li.appendChild(editBtn)

            // creating delete btn---
            const deleteBtn = document.createElement("button")
            deleteBtn.innerText = "Remove"
            deleteBtn.classList.add("btn", "deleteBtn")
            li.appendChild(deleteBtn)
    

            todoList.appendChild(li);
        });
    }
}

// function to delete local todo ---
const deleteLocalTodos = (todo) =>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    } 

    let todoText = todo.children[0].innerHTML
    let todoIndex = todos.indexOf(todoText)
    todos.splice(todoIndex, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
    
    // function : slice/ splice----
    console.log(todoIndex)
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos)
addBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', updateTodo)