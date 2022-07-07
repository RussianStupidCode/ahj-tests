/**
 * @jest-environment jsdom
 */

import { PAYMENT_SYSTEM } from '../payment_system';
import CardForm from '../cardForm';
import Card from '../card';

const INPUT_CARD_TEST_DATA = [
  {
    value: '371449635398431',
    expected: {
      cardPS: PAYMENT_SYSTEM.AMERICAN_EXPRESS,
      correctInput: true,
    },
  },
  {
    value: '37144963539843',
    expected: {
      cardPS: PAYMENT_SYSTEM.AMERICAN_EXPRESS,
      correctInput: false,
    },
  },
  {
    value: '5555555555554444',
    expected: {
      cardPS: PAYMENT_SYSTEM.MASTERCARD,
      correctInput: true,
    },
  },
];

const inputCardHandler = test.each(INPUT_CARD_TEST_DATA);

inputCardHandler('input card test %s', ({ value, expected }) => {
  const cards = [
    new Card(PAYMENT_SYSTEM.MIR),
    new Card(PAYMENT_SYSTEM.VISA),
    new Card(PAYMENT_SYSTEM.AMERICAN_EXPRESS),
    new Card(PAYMENT_SYSTEM.MAESTRO),
    new Card(PAYMENT_SYSTEM.MASTERCARD),
    new Card(PAYMENT_SYSTEM.DISCOVER),
  ];

  const cardForm = new CardForm(cards);

  cardForm.bindToDOM(document.body);
  cardForm.input.value = value;
  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });

  cardForm.input.dispatchEvent(event);

  expect(cardForm.getActiveCard().paymentSystem).toBe(expected.cardPS);
  expect(cardForm.isCorrectInput).toBe(expected.correctInput);
});
