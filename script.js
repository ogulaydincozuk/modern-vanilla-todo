const input = document.getElementById('todo-input');
const categoryInput = document.getElementById('category-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

document.getElementById('current-date').innerText = new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });

addBtn.addEventListener('click', () => {
    if (!input.value.trim() || !dateInput.value) return;
    createTodo(input.value, categoryInput.value, dateInput.value, false);
    input.value = "";
    updateStats();
});

function createTodo(text, cat, date, isDone) {
    const li = document.createElement('li');
    li.className = `task-item ${isDone ? 'completed' : ''}`;
    li.dataset.status = isDone ? 'completed' : 'pending';
    
    li.innerHTML = `
        <div class="task-info">
            <span class="task-text" style="display:block; font-weight:500;">${text}</span>
            <small style="color:#8e8e93;">${date}</small>
        </div>
        <span class="badge badge-${cat.toLowerCase()}">${cat}</span>
        <button class="complete-btn">${isDone ? 'Geri Al' : 'Tamamla'}</button>
        <button class="delete-btn">Sil</button>
    `;
    
    // Tamamlama Butonu
    li.querySelector('.complete-btn').addEventListener('click', () => {
        const completed = li.classList.toggle('completed');
        li.dataset.status = completed ? 'completed' : 'pending';
        li.querySelector('.complete-btn').innerText = completed ? 'Geri Al' : 'Tamamla';
        updateStats();
    });

    // Silme Butonu
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        updateStats();
    });

    todoList.appendChild(li);
}

function updateStats() {
    const total = document.querySelectorAll('.task-item').length;
    const completed = document.querySelectorAll('.task-item.completed').length;
    const progress = total === 0 ? 0 : (completed / total) * 100;
    document.getElementById('progress-fill').style.width = progress + "%";
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.task-item').forEach(item => {
            item.style.display = (filter === 'all' || item.dataset.status === filter) ? 'grid' : 'none';
        });
    });
});