import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Params {
  route: () => void;
  colorBtn: string;
  colorText: string;
  textBtn: string;
}

export const ButtonDesign = ({ route, colorBtn, colorText, textBtn }: Params) => {
  return (
    <TouchableOpacity onPress={() => route()} style={[{ backgroundColor: colorBtn }, Styles.btn]}>
      <Text style={[{ color: colorText }, Styles.btnText]}>{textBtn}</Text>
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
    width: '90%',
    color: 'orange',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
