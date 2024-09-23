"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ToDoApp {
    constructor() {
        this.taskList = document.getElementById('taskList');
        this.taskInput = document.getElementById('taskInput');
        this.addTaskButton = document.getElementById('addTaskButton');
        this.catImage = document.getElementById('catImage');
        this.addTaskButton.addEventListener('click', () => this.addTask());
        this.fetchAndDisplayCatImage(); // Display initial cat image
    }
    addTask() {
        return __awaiter(this, void 0, void 0, function* () {
            const taskText = this.taskInput.value.trim();
            if (taskText !== '') {
                const li = document.createElement('li');
                li.innerHTML = `
              <span>${taskText}
              <div class="task-buttons">
                  <button class="complete-button"><i class="fas fa-check"></i></button>
                  <button class="delete-button"><i class="fas fa-trash"></i></button>
              </div>
          `;
                this.taskList.appendChild(li);
                this.taskInput.value = '';
                // Add event listeners for complete and delete buttons
                const completeButton = li.querySelector('.complete-button');
                const deleteButton = li.querySelector('.delete-button');
                completeButton === null || completeButton === void 0 ? void 0 : completeButton.addEventListener('click', () => this.toggleComplete(li));
                deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener('click', () => this.deleteTask(li));
                // Fetch and display a new cat image
                yield this.fetchAndDisplayCatImage();
            }
        });
    }
    fetchAndDisplayCatImage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catImageUrl = yield this.fetchRandomCatImage();
                this.catImage.src = catImageUrl;
            }
            catch (error) {
                console.error('Error fetching cat image:', error);
            }
        });
    }
    fetchRandomCatImage() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('https://api.thecatapi.com/v1/images/search');
            const data = yield response.json();
            console.log(data);
            return data[0].url;
        });
    }
    toggleComplete(taskItem) {
        taskItem.classList.toggle('completed');
    }
    deleteTask(taskItem) {
        taskItem.remove();
    }
}
// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ToDoApp();
});
