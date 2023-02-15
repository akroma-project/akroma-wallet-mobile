import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Params {
  pressioned: () => void;
  textBtn: string;
  disabled?: boolean;
  colorBtn?: string;
  colorText?: string;
}

export const ButtonDesign = ({ pressioned, colorBtn, colorText, textBtn, disabled }: Params) => {
  let bgStyle = {};
  let textStyle = {};
  if (disabled) {
    bgStyle = { backgroundColor: '#8F0000' };
    textStyle = { color: 'gray' };
  } else {
    bgStyle = { backgroundColor: colorBtn ? colorBtn : '#DB0000' };
    textStyle = { color: colorText ? colorText : 'white' };
  }
  return (
    <TouchableOpacity disabled={disabled ? disabled : false} onPress={() => pressioned()} style={[bgStyle, Styles.btn]}>
      <Text style={[textStyle, Styles.btnText]}>{textBtn}</Text>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  btn: {
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    color: 'orange',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
