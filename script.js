const taskList = document.getElementById("task-list");

document.getElementById('add-button').addEventListener('click', () => {
    addTask();
});

document.getElementById('task-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask(taskText = '', isCompleted = false) {
    const taskInput = document.getElementById('task-input');
    const taskValue = taskText || taskInput.value.trim();

    if (taskValue === '') {
        alert('Please enter a task!');
        return;
    }

    // Create task element
    const li = document.createElement('li');

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', () => {
        span.classList.toggle('completed', checkbox.checked);
        saveData();
    });

    // Create task text span
    const span = document.createElement('span');
    span.textContent = taskValue;
    if (isCompleted) {
        span.classList.add('completed');
    }

    // Create delete button
    const deleteBtn = createDeleteButton(li);

    // Append elements to the task item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Add the task to the list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';

    saveData();
}


function createDeleteButton(li) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-button');

    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveData();
    });

    return deleteBtn;
}

function saveData() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        const span = li.querySelector('span');
        const checkbox = li.querySelector('input[type="checkbox"]');
        tasks.push({ text: span.textContent, completed: checkbox.checked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

// Load tasks from local storage when the page loads
showTask();
