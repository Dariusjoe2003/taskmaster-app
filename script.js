const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);

    // Add event listeners
    taskItem.querySelector('.complete').addEventListener('click', () => toggleComplete(index));
    taskItem.querySelector('.delete').addEventListener('click', () => deleteTask(index));
  });
}

function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Event Listeners
taskForm.addEventListener('submit', addTask);
document.addEventListener('DOMContentLoaded', renderTasks);
