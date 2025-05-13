// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText, false);
            saveTask(taskText, false);
            taskInput.value = '';
        }
    });

    function addTask(taskText, completed) {
        const li = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        const span = document.createElement('span');
        span.textContent = taskText;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';

        li.appendChild(radio);
        li.appendChild(span);
        li.appendChild(removeButton);
        taskList.appendChild(li);

        if (completed) {
            li.classList.add('completed');
            radio.checked = true;
        }

        // Event listener to toggle the completed state
        radio.addEventListener('change', () => {
            li.classList.toggle('completed');
            updateTask(taskText, radio.checked);
        });

        // Event listener to toggle the completed state when clicking on the task name
        span.addEventListener('click', () => {
            radio.checked = !radio.checked;
            li.classList.toggle('completed');
            updateTask(taskText, radio.checked);
        });

        // Event listener to remove the task when the "X" button is clicked
        removeButton.addEventListener('click', () => {
            removeTask(taskText);
            taskList.removeChild(li);
        });
    }

    function saveTask(taskText, completed) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: completed });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTask(taskText, completed) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task =>
            task.text === taskText ? { text: taskText, completed: completed } : task
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }
});