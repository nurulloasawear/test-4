document.addEventListener('DOMContentLoaded', () => {
    console.log('Loyiha 4 script yuklandi!');

    // Dashboard uchun foydalanuvchi ismini ko'rsatish va chiqish tugmasi logikasi
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        const username = localStorage.getItem('foydalanuvchi_nomi');
        if (username) {
            usernameDisplay.textContent = `Salom, ${username}!`;
        }
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('foydalanuvchi_nomi');
            window.location.href = '../pages/signin.html';
        });
    }

    // crud.html uchun vazifalarni olish va ko'rsatish
    const taskTable = document.getElementById('data-table');
    if (taskTable) {
        loadTasks();
        const form = document.getElementById('crud-form');
        if (form) {
            form.addEventListener('submit', saveTask);
            const cancelEditBtn = document.getElementById('cancel-edit');
            if (cancelEditBtn) {
                cancelEditBtn.addEventListener('click', clearForm);
            }
        }
    }

    function loadTasks() {
        fetch('/api/api_1/tasks/') // Sizning API manzilingizga moslang (Loyiha 4)
            .then(response => response.json())
            .then(data => displayTasks(data))
            .catch(error => console.error('Vazifalarni olishda xatolik (Loyiha 4):', error));
    }

    function displayTasks(tasks) {
        const tbody = document.getElementById('data-body');
        if (tbody) {
            tbody.innerHTML = '';
            tasks.forEach(task => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${task.id}</td>
                    <td>${task.title}</td>
                    <td><input type="checkbox" ${task.is_completed ? 'checked' : ''} disabled></td>
                    <td>
                        <button onclick="editTask(${task.id})">Tahrirlash</button>
                        <button onclick="deleteTask(${task.id})">O'chirish</button>
                    </td>
                `;
            });
        }
    }

    function saveTask(event) {
        event.preventDefault();
        const titleInput = document.getElementById('title');
        const isCompletedInput = document.getElementById('is_completed');
        const idInput = document.getElementById('id');
        if (titleInput && isCompletedInput && idInput) {
            const title = titleInput.value;
            const is_completed = isCompletedInput.checked;
            const id = idInput.value;

            const taskData = { title: title, is_completed: is_completed };
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/api/api_1/tasks/${id}/` : '/api/api_1/tasks/'; // Sizning API manzilingizga moslang (Loyiha 4)

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    // Agar kerak bo'lsa, token qo'shing: 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(taskData),
            })
            .then(response => response.json())
            .then(() => {
                loadTasks();
                clearForm();
            })
            .catch(error => console.error('Vazifani saqlashda xatolik (Loyiha 4):', error));
        }
    }

    function editTask(id) {
        fetch(`/api/api_1/tasks/${id}/`) // Sizning API manzilingizga moslang (Loyiha 4)
            .then(response => response.json())
            .then(task => {
                document.getElementById('id').value = task.id;
                document.getElementById('title').value = task.title;
                document.getElementById('is_completed').checked = task.is_completed;
                const cancelEditBtn = document.getElementById('cancel-edit');
                if (cancelEditBtn) {
                    cancelEditBtn.style.display = 'inline';
                }
            })
            .catch(error => console.error('Vazifani olishda xatolik (Loyiha 4):', error));
    }

    function deleteTask(id) {
        if (confirm('Vazifani o\'chirishga ishonchingiz komilmi?')) {
            fetch(`/api/api_1/tasks/${id}/`, { // Sizning API manzilingizga moslang (Loyiha 4)
                method: 'DELETE',
                // Agar kerak bo'lsa, token qo'shing: 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            })
            .then(() => loadTasks())
            .catch(error => console.error('Vazifani o\'chirishda xatolik (Loyiha 4):', error));
        }
    }

    function clearForm() {
        const form = document.getElementById('crud-form');
        if (form) {
            form.reset();
            document.getElementById('id').value = '';
            const cancelEditBtn = document.getElementById('cancel-edit');
            if (cancelEditBtn) {
                cancelEditBtn.style.display = 'none';
            }
        }
    }

    // Dashboard uchun loyihalarni olish va ko'rsatish (dashboard.html)
    const projectTable = document.getElementById('project-table');
    if (projectTable) {
        loadProjects();
    }

    function loadProjects() {
        fetch('/api/api_2/projects/') // Sizning API manzilingizga moslang (Loyiha 4)
            .then(response => response.json())
            .then(data => displayProjects(data))
            .catch(error => console.error('Loyihalarni olishda xatolik (Loyiha 4):', error));
    }

    function displayProjects(projects) {
        const tbody = document.getElementById('project-body');
        if (tbody) {
            tbody.innerHTML = '';
            projects.forEach(project => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${project.name}</td>
                    <td>${project.start_date}</td>
                `;
            });
        }
    }
});
