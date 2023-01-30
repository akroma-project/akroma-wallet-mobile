import React from 'react';
import { View } from 'react-native';
import MinusSvg from '../assets/svg/MinusSvg';
import GlobalStyles from '../constants/GlobalStyles';

const DateSelector = () => {
  return (
    <View style={GlobalStyles.pt8}>
      <View style={GlobalStyles.alingItemsCenter}>
        <MinusSvg />
      </View>
    </View>
  );
};

export default DateSelector;
