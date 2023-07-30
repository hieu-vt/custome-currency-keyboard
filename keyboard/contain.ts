import {Dimensions} from 'react-native';

export const {width: WIDTH_KEYBOARD} = Dimensions.get('window');

export const HEIGHT_ITEM = 50;
export const SPACE_ITEM = 10;
export const WIDTH_ITEM = WIDTH_KEYBOARD / 3;

export const ICON_DELETE = 'x';
export const DOT = '.';

export const KEYBOARD_VALUE = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [DOT, 0, ICON_DELETE],
];

export const HEIGHT_KEYBOARD =
  KEYBOARD_VALUE.length * HEIGHT_ITEM + SPACE_ITEM * 4;

export const EMPTY_VALUE = '';
export const COMMA_CHARACTER = ',';
