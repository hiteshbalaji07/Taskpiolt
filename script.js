let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("searchBar").addEventListener("input", renderTasks);

function addTask() {
    let text = document.getElementById("taskInput").value.trim();
    let category = document.getElementById("category").value;
    let priority = document.getElementById("priority").value;

    if (text === "") {
        alert("Enter a task!");
        return;
    }

    let task = {
        text,
        category,
        priority,
        completed: false
    };

    tasks.push(task);
    save();
    renderTasks();

    document.getElementById("taskInput").value = "";
}

function renderTasks() {
    let list = document.getElementById("taskList");
    let search = document.getElementById("searchBar").value.toLowerCase();

    list.innerHTML = "";

    tasks
        .filter(t => t.text.toLowerCase().includes(search))
        .forEach((task, index) => {

        let li = document.createElement("li");
        li.classList.add(task.priority);

        li.innerHTML = `
            <div class="left">
                <div class="checkbox ${task.completed ? "completed" : ""}" onclick="toggle(${index})"></div>
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <span class="category">${task.category}</span>
            </div>

            <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
        `;

        list.appendChild(li);
    });

    updateStats();
}

function toggle(i) {
    tasks[i].completed = !tasks[i].completed;
    save();
    renderTasks();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    save();
    renderTasks();
}

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
    document.getElementById("totalCount").innerText = tasks.length;
    document.getElementById("completedCount").innerText = tasks.filter(t => t.completed).length;
    document.getElementById("pendingCount").innerText = tasks.filter(t => !t.completed).length;
}

renderTasks();
// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}
