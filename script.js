document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function saveTasksToLocalStorage() {
        const currentTasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            currentTasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
    }

    function addTask(taskText, save = true) {
        taskText = taskText.trim();

        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        removeButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
            saveTasksToLocalStorage();
        });

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) {
            taskInput.value = '';
        }

        if (save) {
            saveTasksToLocalStorage();
        }
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    addButton.addEventListener('click', () => {
        addTask(taskInput.value, true);
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value, true);
        }
    });

    loadTasks();
});
