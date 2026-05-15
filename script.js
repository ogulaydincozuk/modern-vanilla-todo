const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', getTodos);
addBtn.addEventListener('click', addTodo);

function addTodo() {
    if (input.value.trim() === "") return;
    
    createTodoElement(input.value);
    saveLocalTodos(input.value);
    input.value = "";
}

function createTodoElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${text}</span><button class="delete-btn">Sil</button>`;
    
    li.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') li.classList.toggle('completed');
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        removeLocalTodos(text);
        li.remove();
    });

    todoList.appendChild(li);
}

function saveLocalTodos(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => createTodoElement(todo));
}

function removeLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}