import Button from './button';
import Input from './input';
import { PAYMENT_SYSTEM_NUMBER_CHECK_LENGTH } from './payment_system';
import { getPaymentSystem, luhnAlgorithm, refineCardNumber } from './utils';

export default class CardForm {
  static createCardsContainer(cards) {
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('d-flex', 'flex-row', 'y-2');

    cards.forEach((card) => {
      card.bindToDOM(cardsContainer);
    });

    return cardsContainer;
  }

  static createInputContainer(input, button) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('d-flex', 'flex-row', 'y-2');

    input.bindToDOM(inputContainer);
    button.bindToDOM(inputContainer);

    return inputContainer;
  }

  constructor(cards) {
    this.cards = new Map(cards.map((card) => [card.paymentSystem, card]));

    this.el = document.createElement('div');
    this.el.classList.add(
      'card-form',
      'd-flex',
      'flex-column',
      'border',
      'border-primary',
      'p-1'
    );

    this.button = new Button('Submit');
    this.input = new Input();

    this.cardsContainer = CardForm.createCardsContainer(this.cards);
    this.inputContainer = CardForm.createInputContainer(
      this.input,
      this.button
    );

    this.el.insertAdjacentElement('beforeEnd', this.cardsContainer);
    this.el.insertAdjacentElement('beforeEnd', this.inputContainer);

    this.setListeners();
  }

  setListeners() {
    this.input.setInputListener(() => {
      const cardNumber = this.input.value;

      const paymentSystem = getPaymentSystem(cardNumber);

      if (!paymentSystem) {
        this.button.deactivate();
        this.activateCard();
        return;
      }

      this.activateCard(paymentSystem);

      const refineNumber = refineCardNumber(cardNumber);

      const isValidNumber =
        luhnAlgorithm(cardNumber) &&
        PAYMENT_SYSTEM_NUMBER_CHECK_LENGTH[paymentSystem](refineNumber.length);

      if (isValidNumber) {
        this.button.activate();
        return;
      }

      this.button.deactivate();
    });

    this.button.addClickListener(() => {
      console.log('success');
    });
  }

  activateCard(paymentSystem) {
    this.cards.forEach((card) => {
      if (card.paymentSystem === paymentSystem) {
        card.activate();
        return;
      }

      card.deactivate();
    });
  }

  getCard(paymentSystem) {
    return this.cards(paymentSystem);
  }

  getActiveCard() {
    for (const [, value] of this.cards) {
      if (value.isActive) {
        return value;
      }
    }
    return undefined;
  }

  get isCorrectInput() {
    return this.button.isActive;
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
