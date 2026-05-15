const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const pendingLabel = document.getElementById('pending-count');
const completedLabel = document.getElementById('completed-count');

document.getElementById('current-date').innerText = new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });

addBtn.addEventListener('click', () => {
    if (input.value.trim() === "") return;
    createTodo(input.value, false);
    input.value = "";
    updateStats();
});

function createTodo(text, isDone) {
    const li = document.createElement('li');
    li.className = `task-item ${isDone ? 'completed' : ''}`;
    li.innerHTML = `
        <span>${text}</span>
        <div class="actions">
            <span class="delete-action">Sil</span>
        </div>
    `;
    
    li.addEventListener('click', (e) => {
        if (e.target.className !== 'delete-action') {
            li.classList.toggle('completed');
            updateStats();
        }
    });

    li.querySelector('.delete-action').addEventListener('click', () => {
        li.remove();
        updateStats();
    });

    todoList.appendChild(li);
}

function updateStats() {
    const total = document.querySelectorAll('.task-item').length;
    const completed = document.querySelectorAll('.task-item.completed').length;
    pendingLabel.innerText = total - completed;
    completedLabel.innerText = completed;
}