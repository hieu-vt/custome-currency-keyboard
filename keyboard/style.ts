import {StyleSheet} from 'react-native';
import {
  WIDTH_KEYBOARD,
  HEIGHT_KEYBOARD,
  SPACE_ITEM,
  WIDTH_ITEM,
  HEIGHT_ITEM,
} from './contain';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  contentStyle: {flex: 1},
  keyboards: {
    width: WIDTH_KEYBOARD,
    height: HEIGHT_KEYBOARD,
  },
  row: {
    width: WIDTH_KEYBOARD,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d5db',
  },
  itemStyle: {
    width: WIDTH_ITEM - SPACE_ITEM,
    height: HEIGHT_ITEM,
    marginHorizontal: SPACE_ITEM / 2,
    marginVertical: SPACE_ITEM / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '700',
  },
  bgItem: {
    backgroundColor: '#d3d5db',
  },
});
