export default class Card {
  static get activeClass() {
    return 'card-active';
  }

  static get notActiveClass() {
    return 'card-notactive';
  }

  constructor(paymentSystem, image = '') {
    this.el = document.createElement('div');
    this.el.classList.add('card', 'card-notactive', 'm-2');
    this.el.dataset.ps = paymentSystem;
    this.deactivate();

    const cardImage = document.createElement('img');
    cardImage.src = image;

    this.el.insertAdjacentElement('beforeEnd', cardImage);
  }

  get paymentSystem() {
    return this.el.dataset.ps;
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }

  get isActive() {
    return this.active;
  }

  activate() {
    this.el.classList.remove(Card.notActiveClass);
    this.el.classList.add(Card.activeClass);
    this.active = true;
  }

  deactivate() {
    this.el.classList.add(Card.notActiveClass);
    this.el.classList.remove(Card.activeClass);
    this.active = false;
  }
}
