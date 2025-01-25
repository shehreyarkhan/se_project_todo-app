class Todo {
  constructor(data, selector, { onToggleComplete, onDelete }) {
    this._data = data;
    this._selector = selector;
    this._onToggleComplete = onToggleComplete;
    this._onDelete = onDelete;
  }

  _setEventListeners() {
    // Event: Delete Button
    this._deleteButton.addEventListener("click", () => {
      if (this._data.completed) {
        this._onToggleComplete(false); // Decrement completed count if checked
      }
      this._onDelete(); // Notify deletion
      this._element.remove(); // Remove from DOM
    });

    // Event: Checkbox Change
    this._checkbox.addEventListener("change", () => {
      this._toggleCompletedState(); // Toggle state and update counter
    });
  }

  _toggleCompletedState() {
    this._data.completed = this._checkbox.checked; // Update internal state
    this._onToggleComplete(this._data.completed); // Notify counter for increment/decrement
  }

  _generateCheckboxEl() {
    this._checkbox = this._element.querySelector(".todo__completed");
    this._checkbox.checked = this._data.completed; // Set initial state
    this._checkbox.id = `todo-${this._data.id}`;

    this._label = this._element.querySelector(".todo__label");
    this._label.setAttribute("for", `todo-${this._data.id}`); // Link label to checkbox
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
