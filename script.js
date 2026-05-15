const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        createTodo(input.value);
        input.value = "";
    }
});

function createTodo(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="todo-text">${text}</span>
        <button class="delete-btn">Sil</button>
    `;
    
    li.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            li.classList.toggle('completed');
        }
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });

    todoList.appendChild(li);
}