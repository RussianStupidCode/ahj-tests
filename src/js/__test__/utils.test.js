import { PAYMENT_SYSTEM_NUMBER } from '../payment_system';
import { luhnAlgorithm, getPaymentSystem } from '../utils';

const CARDS_NUMBER_TEST_DATA = [
  {
    value: '4561 2612 1234 5467',
    expected: true,
  },
  {
    value: '371449635398431',
    expected: true,
  },
  {
    value: '4561-2612-1234-5467',
    expected: true,
  },
  {
    value: '4561261212345467',
    expected: true,
  },
  {
    value: '4561 2612 1234 5464',
    expected: false,
  },
  {
    value: '4561261212345464',
    expected: false,
  },
];

const luhnAlgorithmHandler = test.each(CARDS_NUMBER_TEST_DATA);

luhnAlgorithmHandler('lungh algorithm test %s', ({ value, expected }) => {
  const actual = luhnAlgorithm(value);
  expect(actual).toBe(expected);
});

const PAYMENT_SYSTEM_TEST_DATA = [
  {
    value: '4561 2612 1234 5467',
    expected: PAYMENT_SYSTEM_NUMBER[4],
  },
  {
    value: '2561-2612-1234-5467',
    expected: PAYMENT_SYSTEM_NUMBER[2],
  },
  {
    value: '0561 2612 1234 5464',
    expected: undefined,
  },
  {
    value: '371449635398431',
    expected: PAYMENT_SYSTEM_NUMBER[37],
  },
];

const getPaymentSystemHandler = test.each(PAYMENT_SYSTEM_TEST_DATA);

getPaymentSystemHandler('get payment system test %s', ({ value, expected }) => {
  const actual = getPaymentSystem(value);
  expect(actual).toBe(expected);
});
