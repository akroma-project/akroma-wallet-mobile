import React from 'react';
import { TouchableOpacity } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import Clipboard from '@react-native-clipboard/clipboard';
import CopyIconSvg from '../assets/svg/CopyIconSvg';
export const CopyIcon = ({ value }) => {
  return (
    <TouchableOpacity style={GlobalStyles.copyIconContainer} onPress={() => Clipboard.setString(value)}>
      <CopyIconSvg />
    </TouchableOpacity>
  );
};
