export default class Input {
  constructor() {
    this.el = document.createElement('input');
    this.el.classList.add('form-control', 'm-1');
    this.el.type = 'text';

    this.inputListeners = [];

    this.el.addEventListener('input', (event) => {
      this.input(event);
    });
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }

  setInputListener(callback) {
    this.inputListeners.push(callback);
  }

  input(event) {
    event.preventDefault();
    this.inputListeners.forEach((el) => el.call(null));
  }

  get value() {
    return this.el.value;
  }

  dispatchEvent(event) {
    this.el.dispatchEvent(event);
  }

  set value(value) {
    this.el.value = value;
  }
}
