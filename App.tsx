import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {formatEndValue} from './keyboard/currency';
import KeyBoardCustom, {
  hideKeyboard,
  onSelectionChangeCustomeKeyboard,
  showKeyboard,
} from './keyboard/keyboard-custom';

const App = () => {
  const [text, setText] = useState('');

  const handleBlur = (value: string) => {
    console.log('value', value);
    setText(formatEndValue(value));
  };

  return (
    <View style={{paddingTop: 30, flex: 1}}>
      <KeyBoardCustom>
        <View style={{flex: 1}}>
          <TextInput
            value={text}
            style={[
              {
                color: 'red',
                paddingHorizontal: 16,
                fontSize: 56,
                padding: 0,
                paddingVertical: 0,
              },
            ]}
            maxLength={18}
            keyboardType="numeric"
            placeholder={'0.00'}
            onBlur={hideKeyboard}
            onFocus={() => {
              showKeyboard({
                onChangeText: value => {
                  setText(value);
                },
                defaultValue: text,
                maxLength: 18,
                isCurrencyFormat: true,
                decimal: 4,
                onBlur: handleBlur,
              });
            }}
            textAlign="center"
            placeholderTextColor={'red'}
            selectionColor={'#08dad275'}
            textAlignVertical="center"
            allowFontScaling={false}
            showSoftInputOnFocus={false}
            onSelectionChange={onSelectionChangeCustomeKeyboard}
          />
        </View>
      </KeyBoardCustom>
    </View>
  );
};

export default App;
