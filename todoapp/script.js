document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const feedbackMessage = document.createElement('div');
    feedbackMessage.className = 'feedback-message';
    document.body.appendChild(feedbackMessage);

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add new task
    function addTask(taskText) {
        if (taskText.trim() === '') {
            showFeedback('Task cannot be empty!', 'error');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.push(task);
        saveTasks();
        renderTask(task);
        taskInput.value = '';
        showFeedback('Task added successfully!', 'success');
    }

    // Render a single task
    function renderTask(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            </div>
            <div class="task-actions">
                <button class="edit-btn" aria-label="Edit task"><i class="bi bi-pencil"></i></button>
                <button class="delete-btn" aria-label="Delete task"><i class="bi bi-trash"></i></button>
            </div>
        `;

        // Add event listeners for task actions
        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editTask(task.id));

        taskList.appendChild(li);
    }

    // Toggle task completion
    function toggleTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            filterTasks(document.querySelector('.filter-btn.active').dataset.filter);
            showFeedback(task.completed ? 'Task marked as completed!' : 'Task marked as pending!', 'info');
        }
    }

    // Delete task
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        filterTasks(document.querySelector('.filter-btn.active').dataset.filter);
        showFeedback('Task deleted successfully!', 'success');
    }

    // Edit task
    function editTask(taskId) {
        const taskElement = document.querySelector(`li[data-id="${taskId}"]`);
        const taskTextElement = taskElement.querySelector('.task-text');
        const currentText = taskTextElement.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';

        taskTextElement.replaceWith(input);
        input.focus();

        input.addEventListener('blur', function() {
            const newText = input.value.trim();
            if (newText !== '') {
                const task = tasks.find(t => t.id === taskId);
                if (task) {
                    task.text = newText;
                    saveTasks();
                    showFeedback('Task updated successfully!', 'success');
                }
            }
            filterTasks(document.querySelector('.filter-btn.active').dataset.filter);
        });

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    }

    // Filter tasks
    function filterTasks(filterType) {
        taskList.innerHTML = '';
        let filteredTasks = tasks;

        if (filterType === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (filterType === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }

        filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        filteredTasks.forEach(task => renderTask(task));
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Show feedback messages
    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-message ${type}`;
        setTimeout(() => {
            feedbackMessage.textContent = '';
            feedbackMessage.className = 'feedback-message';
        }, 3000);
    }

    // Event Listeners
    addTaskBtn.addEventListener('click', () => addTask(taskInput.value));

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterTasks(btn.dataset.filter);
        });
    });

    // Toggle sidebar visibility
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '70px';
            sidebar.style.overflow = 'hidden';
        } else {
            sidebar.style.width = '280px';
            sidebar.style.overflow = 'auto';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            // Logic for navigating up through tasks (if needed)
        } else if (e.key === 'ArrowDown') {
            // Logic for navigating down through tasks (if needed)
        }
    });

    // Navigation item click handling
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Category item click handling
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(cat => cat.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Initial render
    filterTasks('all');
}); 