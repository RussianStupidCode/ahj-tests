import Card from './card';
import VISA_IMG from '../img/visa.png';
import MIR_IMG from '../img/mir.png';
import AMERICAN_EXPRESS_IMG from '../img/american_express.png';
import MAESTRO_IMG from '../img/maestro.png';
import MASTERCARD_IMG from '../img/mastercard.png';
import DISCOVER_IMG from '../img/discover.png';
import CardForm from './cardForm';
import { PAYMENT_SYSTEM } from './payment_system';

function createCardForm(parent) {
  const cards = [
    new Card(PAYMENT_SYSTEM.MIR, MIR_IMG),
    new Card(PAYMENT_SYSTEM.VISA, VISA_IMG),
    new Card(PAYMENT_SYSTEM.AMERICAN_EXPRESS, AMERICAN_EXPRESS_IMG),
    new Card(PAYMENT_SYSTEM.MAESTRO, MAESTRO_IMG),
    new Card(PAYMENT_SYSTEM.MASTERCARD, MASTERCARD_IMG),
    new Card(PAYMENT_SYSTEM.DISCOVER, DISCOVER_IMG),
  ];

  const cardForm = new CardForm(cards);

  cardForm.bindToDOM(parent);

  return cardForm;
}

createCardForm(document.querySelector('.root'));
