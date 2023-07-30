import {rxNumber_0_9} from './regex';
import {COMMA_CHARACTER} from './contain';

export const currencyFormat = function (cur: number, comma = ',') {
  const [integer, decimal] = String(cur).split('.');
  const decimalValue = decimal ? `.${decimal}` : '';
  return integer.replace(/(\d)(?=(\d{3})+\b)/g, `$1${comma}`) + decimalValue;
};

export const removeCommaCharacter = function (input: string) {
  return input.split(COMMA_CHARACTER).join('');
};

export const extractNumberWithDecimal = (
  inputValue: string,
  decimal = 2,
  regex = rxNumber_0_9,
) => {
  const match = inputValue.replace(regex, '');

  const listNumberValue = match?.split('.');

  const [integerPart, decimalPart] = listNumberValue;

  const integer = currencyFormat(Number(integerPart || '0'));

  const decimalValue = (decimalPart || '').substring(0, decimal);

  if (listNumberValue.length > 1) {
    return `${integer}.${decimalValue}`;
  }

  return integer;
};

export const checkMaxDecimal = (
  inputValue: string,
  decimal = 2,
  regex = rxNumber_0_9,
  selection: number,
) => {
  const match = inputValue.replace(regex, '');

  const listNumberValue = match?.split('.');

  const [integerPart, decimalPart] = listNumberValue;

  if (integerPart && integerPart.length >= selection) {
    return false;
  }

  if (decimalPart != null && decimalPart.length >= decimal) {
    return true;
  }

  return false;
};

export const formatEndValue = (value: string) => {
  if (!value) {
    value = '';
  } else {
    if (!value.includes('.')) {
      value = value + '.00';
    } else {
      value = `${value.split('.')[0]}.${value.split('.')[1].padEnd(2, '0')}`;
    }
  }

  return value;
};
