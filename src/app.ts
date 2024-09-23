class ToDoApp {
  private taskList: HTMLUListElement;
  private taskInput: HTMLInputElement;
  private addTaskButton: HTMLButtonElement;
  private catImage: HTMLImageElement;

  constructor() {
      this.taskList = document.getElementById('taskList') as HTMLUListElement;
      this.taskInput = document.getElementById('taskInput') as HTMLInputElement;
      this.addTaskButton = document.getElementById('addTaskButton') as HTMLButtonElement;
      this.catImage = document.getElementById('catImage') as HTMLImageElement;

      this.addTaskButton.addEventListener('click', () => this.addTask());
      this.fetchAndDisplayCatImage(); // Display initial cat image
  }

  async addTask() {
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
          completeButton?.addEventListener('click', () => this.toggleComplete(li));
          deleteButton?.addEventListener('click', () => this.deleteTask(li));

          // Fetch and display a new cat image
          await this.fetchAndDisplayCatImage();
      }
  }

  async fetchAndDisplayCatImage() {
      try {
          const catImageUrl = await this.fetchRandomCatImage();
          this.catImage.src = catImageUrl;
      } catch (error) {
          console.error('Error fetching cat image:', error);
      }
  }

  async fetchRandomCatImage(): Promise<string> {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      console.log(data);
      return data[0].url;
  }

  toggleComplete(taskItem: HTMLLIElement) {
      taskItem.classList.toggle('completed');
  }

  deleteTask(taskItem: HTMLLIElement) {
      taskItem.remove();
  }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new ToDoApp();
});
