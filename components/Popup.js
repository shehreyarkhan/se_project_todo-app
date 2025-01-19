class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._closeButton = this._popup.querySelector(".popup__close");
      this._handleEscapeClose = this._handleEscapeClose.bind(this);
    }
  
    open() {
      this._popup.classList.add("popup_visible");
      document.addEventListener("keydown", this._handleEscapeClose);
    }
  
    close() {
      this._popup.classList.remove("popup_visible");
      document.removeEventListener("keydown", this._handleEscapeClose);
    }
  
    _handleEscapeClose(evt) {
      if (evt.key === "Escape") {
        this.close();
      }
    }
  
    setEventListeners() {
      this._popup.addEventListener("mousedown", (evt) => {
        if (evt.target === this._popup || evt.target === this._closeButton) {
          this.close();
        }
      });
    }
  }
  
  export default Popup;
  