import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";

// Selectors
const addTodoButton = document.querySelector(".button_action_add");
const todosListSelector = ".todos__list";
const counterSelector = ".counter__text";

// Instantiate TodoCounter
const todoCounter = new TodoCounter(initialTodos, counterSelector);

// Instantiate Section for Todos
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

// Function to Generate a Todo
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    onToggleComplete: (increment) => todoCounter.updateCompleted(increment),
    onDelete: () => {
      todoCounter.updateTotal(false);
    },
  });
  return todo.getView();
};

// Instantiate PopupWithForm for Adding Todos
const addTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const id = uuidv4();
  const newTodoData = {
    name: formData["name"],
    date: formData["date"] || "No due date",
    id,
    completed: false,
  };
  const todoElement = generateTodo(newTodoData);
  todosSection.addItem(todoElement);
  todoCounter.updateTotal(true); // Increment total count
  addTodoPopup.close();
});
addTodoPopup.setEventListeners();

// Instantiate FormValidator for Add Todo Form
const addTodoFormValidator = new FormValidator(validationConfig, addTodoPopup.getFormElement());
addTodoFormValidator.enableValidation();

// Render Initial Todos and Counter
todosSection.renderItems();
todoCounter.updateCounter();

// Add Event Listener to Open Popup
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  addTodoFormValidator.resetValidation();
});
