class Todo {
  constructor(data, selector, { onToggleComplete, onDelete }) {
    this._data = data;
    this._selector = selector;
    this._onToggleComplete = onToggleComplete;
    this._onDelete = onDelete;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._onDelete(); // Notify about deletion
      this._element.remove(); // Remove element from DOM
    });

    this._checkbox.addEventListener("change", () => {
      const isCompleted = this._checkbox.checked;
      this._data.completed = isCompleted; // Update internal state
      this._onToggleComplete(isCompleted); // Notify about toggle
    });
  }

  _generateCheckboxEl() {
    this._checkbox = this._element.querySelector(".todo__completed");
    this._checkbox.checked = this._data.completed;
  }

  _generateDate() {
    const todoDate = this._element.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);

    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleDateString()}`;
    }
  }

  getView() {
    const template = document.querySelector(this._selector).content;
    this._element = template.querySelector(".todo").cloneNode(true);

    this._deleteButton = this._element.querySelector(".todo__delete-btn");
    const todoNameEl = this._element.querySelector(".todo__name");
    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._generateDate();
    this._setEventListeners();

    return this._element;
  }
}

export default Todo;
