import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ArrowleftSvg from '../assets/svg/ArrowleftSvg';
import GlobalStyles from '../constants/GlobalStyles';

interface Props {
  title?: string;
}

export const TransparentHeader = (props: Props) => {
  const { title } = props;
  const navigator = useNavigation();
  const handleBack = () => {
    navigator.goBack();
  };
  return (
    <View style={GlobalStyles.transparentHeaderContainer}>
      <View style={GlobalStyles.titleTransparentContainer}>
        <Text style={GlobalStyles.transparentHeaderTitle}>{title}</Text>
      </View>
      <View style={GlobalStyles.arrowBackContainer}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowleftSvg fill="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
