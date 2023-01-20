import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import ArrowdownSvg from '../assets/svg/ArrowdownSvg';
import ArrowupSvg from '../assets/svg/ArrowupSvg';
import GlobalStyles from '../constants/GlobalStyles';
export const HomeTransferButtons = () => {
  return (
    <View style={[GlobalStyles.transferButtonsContainer]}>
      <Button accessoryLeft={() => <ArrowupSvg />} style={GlobalStyles.transferButton} status="control">
        {() => <Text style={GlobalStyles.textButton}>Send</Text>}
      </Button>
      <Button accessoryLeft={() => <ArrowdownSvg />} style={GlobalStyles.transferButton} status="control">
        {() => <Text style={GlobalStyles.textButton}>Receive</Text>}
      </Button>
    </View>
  );
};
