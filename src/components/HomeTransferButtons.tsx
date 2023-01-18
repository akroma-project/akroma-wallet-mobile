import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import ArrowdownSvg from '../assets/svg/ArrowdownSvg';
import ArrowupSvg from '../assets/svg/ArrowupSvg';
import GlobalStyles from '../constants/GlobalStyles';
export const HomeTransferButtons = () => {
  return (
    <View style={GlobalStyles.transferButtonsContainer}>
      <Button style={GlobalStyles.transferButton} status="control">
        {() => (
          <View style={GlobalStyles.buttonIconContent}>
            <ArrowupSvg />
            <Text style={GlobalStyles.textButton}>Send</Text>
          </View>
        )}
      </Button>
      <Button style={GlobalStyles.transferButton} status="control">
        {() => (
          <View style={GlobalStyles.buttonIconContent}>
            <ArrowdownSvg />
            <Text style={GlobalStyles.textButton}>Receive</Text>
          </View>
        )}
      </Button>
    </View>
  );
};
