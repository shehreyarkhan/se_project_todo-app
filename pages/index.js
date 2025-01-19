import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const todosListSelector = ".todos__list";
const counterSelector = ".counter__text";

// Instantiate the TodoCounter
const todoCounter = new TodoCounter(initialTodos, counterSelector);

// Instantiate the Section class to manage to-dos
const todosSection = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      const todoElement = generateTodo(item);
      todosSection.addItem(todoElement);
    },
  },
  todosListSelector
);

// Function to create a Todo instance
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    onToggleComplete: (increment) => todoCounter.updateCompleted(increment),
    onDelete: () => {
      todosSection.removeItem(data);
      todoCounter.updateTotal(false);
    },
  });
  return todo.getView();
};

// Instantiate the popup for adding a new to-do
const addTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const id = uuidv4();
  const newTodoData = { ...formData, id, completed: false };
  const todoElement = generateTodo(newTodoData);
  todosSection.addItem(todoElement);
  todoCounter.updateTotal(true);
  addTodoPopup.close();
});
addTodoPopup.setEventListeners();

// Instantiate FormValidator for the add-todo form
const addTodoFormValidator = new FormValidator(validationConfig, addTodoPopup.getFormElement());
addTodoFormValidator.enableValidation();

// Render initial to-do items and update the counter
todosSection.renderItems();
todoCounter.updateCounter();

// Event listener to open the "Add Todo" popup
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  addTodoFormValidator.resetValidation();
});
