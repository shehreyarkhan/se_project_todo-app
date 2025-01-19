class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    renderItems() {
      this._items.forEach((item) => this._renderer(item));
    }
  
    addItem(element) {
      this._container.append(element);
      this._items.push(element);
    }
  
    removeItem(item) {
      const index = this._items.findIndex((el) => el.id === item.id);
      if (index !== -1) {
        this._items.splice(index, 1);
        this._container.querySelector(`#todo-${item.id}`).remove();
      }
    }
  
    get items() {
      return this._items;
    }
  }
  
  export default Section;
  