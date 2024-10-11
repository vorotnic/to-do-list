"use strict";
// Task class to handle task operations
class ToDoApp {
    constructor() {
        this.tasks = [];
        this.taskList = document.getElementById('taskList');
        this.taskInput = document.getElementById('taskInput');
        this.addTaskButton = document.getElementById('addTaskButton');
        // Add event listener for adding tasks
        this.addTaskButton.addEventListener('click', () => this.addTask());
    }
    // Add a new task
    addTask() {
        const taskName = this.taskInput.value.trim();
        const taskText = this.taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${taskText}`;
            this.taskList.appendChild(li);
            this.taskInput.value = '';
        }
        if (taskName) {
            const newTask = {
                id: this.tasks.length + 1,
                name: taskName,
                completed: false
            };
            this.tasks.push(newTask);
            this.renderTasks();
            this.taskInput.value = '';
        }
    }
    // Toggle task completion
    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
        }
    }
    // Delete a task
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.renderTasks();
    }
    // Render the tasks to the DOM
    renderTasks() {
        this.taskList.innerHTML = ''; // Clear the list first
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.name;
            // Strike-through if the task is completed
            if (task.completed) {
                li.style.textDecoration = 'line-through';
            }
            // Create a complete button
            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Undo' : 'Complete';
            completeButton.addEventListener('click', () => this.toggleTaskCompletion(task.id));
            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => this.deleteTask(task.id));
            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            this.taskList.appendChild(li);
        });
    }
}
// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ToDoApp();
});
