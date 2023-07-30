import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInputSelectionChangeEventData,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {
  DOT,
  EMPTY_VALUE,
  ICON_DELETE,
  KEYBOARD_VALUE,
  WIDTH_KEYBOARD,
} from './contain';
import {
  checkMaxDecimal,
  currencyFormat,
  extractNumberWithDecimal,
  removeCommaCharacter,
} from './currency';
import {removeAt, splice} from './string';
import {styles} from './style';

export interface KeyBoardCustomProps {
  maxLength?: number;
  isDisable?: boolean;
  format?: RegExp;
  decimal?: number;
  isCurrencyFormat?: boolean;
  onBlur?: (text: string) => void;
  onFocus?: () => void;
  defaultValue?: string;
  onChangeText: (text: string) => void;
}

const KeyBoardCustomComponent = forwardRef(({children}: any, ref) => {
  const insets = {top: 30, bottom: 30};
  const [isVisible, setIsVisible] = useState(false);
  const [props, setProps] = useState<KeyBoardCustomProps | null>({
    isCurrencyFormat: true,
    onChangeText: () => {},
  });
  const [isDisable, setIsDisable] = useState(false);
  const selectionCurrent = useRef<{
    start: number;
    last: number;
  } | null>(null);
  const value = useRef<string>(EMPTY_VALUE);

  // func
  const handlePressKey = (key: string | number) => () => {
    switch (key) {
      case DOT:
        if (
          props?.maxLength &&
          !isDisable &&
          value.current.length >= props?.maxLength
        ) {
          setIsDisable(true);
          return;
        }

        if (value.current.includes(DOT) || value.current === EMPTY_VALUE) {
          return;
        }

        console.log('Dot');
        if (props?.isCurrencyFormat) {
          value.current = extractNumberWithDecimal(
            value.current,
            props.decimal,
            props.format,
          );
        }
        if (selectionCurrent.current != null) {
          value.current = splice(
            value.current,
            selectionCurrent.current.start,
            0,
            key,
          );
          selectionCurrent.current = {
            start: value.current.length - selectionCurrent.current.last,
            last: selectionCurrent.current.last,
          };
        } else {
          value.current = value.current + key;
        }

        props?.onChangeText(value.current);
        return;
      case ICON_DELETE:
        console.log('Delete');
        if (
          props?.maxLength &&
          isDisable &&
          value.current.length < props?.maxLength
        ) {
          setIsDisable(false);
        }

        if (selectionCurrent.current !== null) {
          if (selectionCurrent.current.start <= 0) {
            return;
          }

          value.current = removeAt(
            value.current,
            selectionCurrent.current.start - 1,
          );

          if (props?.isCurrencyFormat) {
            value.current = currencyFormat(
              Number(removeCommaCharacter(value.current)),
            );
          }

          selectionCurrent.current = {
            start: value.current.length - selectionCurrent.current.last,
            last: selectionCurrent.current.last,
          };
        } else {
          value.current = removeAt(value.current, value.current.length - 1);
        }

        props?.onChangeText(value.current);

        return;
      default:
        if (props?.maxLength && value.current.length >= props?.maxLength) {
          setIsDisable(true);
          return;
        }

        if (
          checkMaxDecimal(
            value.current,
            props?.decimal,
            props?.format,
            selectionCurrent.current?.start ?? value.current.length,
          )
        ) {
          return;
        }

        if (selectionCurrent.current != null) {
          value.current = splice(
            value.current,
            selectionCurrent.current.start,
            0,
            key.toString(),
          );

          if (props?.isCurrencyFormat) {
            value.current = currencyFormat(
              Number(removeCommaCharacter(value.current)),
            );
          }

          selectionCurrent.current = {
            start: value.current.length - selectionCurrent.current.last,
            last: selectionCurrent.current.last,
          };
        } else {
          value.current = value.current + key;

          if (props?.isCurrencyFormat) {
            value.current = currencyFormat(
              Number(removeCommaCharacter(value.current)),
            );
          }
        }

        props?.onChangeText(value.current);

        return;
    }
  };

  const handleHide = () => {
    // Do it
    props?.onBlur?.(value.current);
    Keyboard.dismiss();

    // Clear value
    setIsVisible(false);
    setProps(null);
    setIsDisable(false);
    selectionCurrent.current = null;
    value.current = '';
  };

  // effect
  useImperativeHandle(ref, () => ({
    hide: handleHide,
    show: (params: KeyBoardCustomProps) => {
      setProps(params);
      setIsVisible(true);
      params.isDisable && setIsDisable(params.isDisable);
      value.current = params?.defaultValue || '';
    },
    onDisable: (is: boolean) => {
      setIsDisable(is);
    },
    onSelectionChange: (
      e: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
    ) => {
      selectionCurrent.current = {
        start: e.nativeEvent.selection.start,
        last: value.current.length - e.nativeEvent.selection.start,
      };
    },
  }));

  return (
    <ScrollView
      keyboardDismissMode="none"
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={styles.wrapper}
      scrollEnabled={false}>
      <TouchableWithoutFeedback onPress={handleHide}>
        {children}
      </TouchableWithoutFeedback>
      {isVisible ? (
        <Animated.View
          key={'KEYBOARD_SHOW'}
          entering={SlideInDown}
          exiting={SlideOutDown}>
          <View style={[styles.keyboards]}>
            {KEYBOARD_VALUE.map((items, index) => {
              return (
                <View style={styles.row} key={index + 'ROW'}>
                  {items.map(item => {
                    if (typeof item === 'string') {
                      return (
                        <TouchableHighlight
                          disabled={isDisable && item !== ICON_DELETE}
                          key={item}
                          activeOpacity={0.4}
                          underlayColor="#DDDDDD"
                          onPress={handlePressKey(item)}>
                          <View style={[styles.itemStyle, styles.bgItem]}>
                            <Text style={styles.textStyle}>{item}</Text>
                          </View>
                        </TouchableHighlight>
                      );
                    }
                    return (
                      <TouchableHighlight
                        key={item}
                        disabled={isDisable}
                        activeOpacity={0.8}
                        underlayColor="#DDDDDD"
                        onPress={handlePressKey(item)}>
                        <View style={[styles.itemStyle, styles.shadow]}>
                          <Text style={styles.textStyle}>{item}</Text>
                        </View>
                      </TouchableHighlight>
                    );
                  })}
                </View>
              );
            })}
          </View>
          <View
            style={[
              styles.bgItem,
              {
                height: insets.bottom,
                width: WIDTH_KEYBOARD,
              },
            ]}
          />
        </Animated.View>
      ) : null}
    </ScrollView>
  );
});

interface KeyBoardCustomRef {
  show: (params: KeyBoardCustomProps) => void;
  hide: () => void;
  onDisable: (isDisable: boolean) => void;
  onSelectionChange:
    | ((e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void)
    | undefined;
}

const ref = React.createRef<KeyBoardCustomRef>();

const KeyBoardCustom = (props: any) => {
  return <KeyBoardCustomComponent ref={ref} {...props} />;
};

export const showKeyboard = (params: KeyBoardCustomProps) => {
  ref.current?.show?.(params);
};

export const hideKeyboard = () => {
  ref.current?.hide?.();
};

export const disableKeyboard = (isDisable: boolean) => {
  ref.current?.onDisable?.(isDisable);
};

export const onSelectionChangeCustomeKeyboard = (
  e: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
) => {
  ref.current?.onSelectionChange?.(e);
};

export default KeyBoardCustom;
