import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const todosListSelector = ".todos__list";
const counterSelector = ".counter__text";

const todoCounter = new TodoCounter(initialTodos, counterSelector);

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    onToggleComplete: (increment) => todoCounter.updateCompleted(increment),
    onDelete: () => {
      todoCounter.updateTotal(false);
    },
  });
  return todo.getView();
};

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  todosSection.addItem(todoElement);
};

const todosSection = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      renderTodo(item);
    },
  },
  todosListSelector
);

const addTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const id = uuidv4();
  const newTodoData = {
    name: formData["name"],
    date: formData["date"] || "No due date",
    id,
    completed: false,
  };

  renderTodo(newTodoData);
  todoCounter.updateTotal(true);
  addTodoPopup.close();

  addTodoFormValidator.resetValidation();
});
addTodoPopup.setEventListeners();

const addTodoFormValidator = new FormValidator(
  validationConfig,
  addTodoPopup.getFormElement()
);
addTodoFormValidator.enableValidation();

todosSection.renderItems();
todoCounter.updateCounter();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});