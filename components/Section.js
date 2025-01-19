export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Render all items
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Add a single item to the container
  addItem(element) {
    this._container.append(element);
  }
}
