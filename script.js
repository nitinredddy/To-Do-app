const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the page loads
window.addEventListener('DOMContentLoaded', loadTasks);

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    // Check for empty input
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create task item elements
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    const taskName = document.createElement('span');
    taskName.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    // Append elements
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    // Clear input field
    taskInput.value = '';

    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector('span').textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage and render them
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        const taskName = document.createElement('span');
        taskName.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskName);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}
