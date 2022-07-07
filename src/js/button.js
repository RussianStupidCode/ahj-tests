export default class Button {
  constructor(text) {
    this.el = document.createElement('button');
    this.el.type = 'button';
    this.el.classList.add('btn', 'btn-success', 'p-2', 'btn-lg');
    this.el.textContent = text;

    this.listeners = [];
    this.active = false;

    this.deactivate();

    this.el.addEventListener('click', this.click.bind(this));
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }

  click() {
    if (this.el.classList.contains(Button.notActiveClass)) {
      return;
    }

    this.listeners.forEach((el) => el.call(null));
  }

  addClickListener(callback) {
    this.listeners.push(callback);
  }

  get isDisabled() {
    return this.el.getAttribute('diabled');
  }

  get isActive() {
    return this.active;
  }

  activate() {
    this.el.removeAttribute('disabled');
    this.active = true;
  }

  deactivate() {
    this.el.setAttribute('disabled', '');
    this.active = false;
  }
}
