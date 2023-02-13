import { Button, Text } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { View } from 'react-native';
import ArrowdownSvg from '../assets/svg/ArrowdownSvg';
import ArrowupSvg from '../assets/svg/ArrowupSvg';
import GlobalStyles from '../constants/GlobalStyles';
import { GlobalContext } from '../providers/GlobalProvider';

export const HomeTransferButtons = () => {
  const { setSendButtonsHeight } = useContext(GlobalContext);
  return (
    <View
      onLayout={event => {
        let { height } = event.nativeEvent.layout;
        setSendButtonsHeight(height);
      }}
      style={[GlobalStyles.transferButtonsContainer]}>
      <Button accessoryLeft={() => <ArrowupSvg />} style={GlobalStyles.transferButton} status="control">
        {() => <Text style={GlobalStyles.textButton}>Send</Text>}
      </Button>
      <Button accessoryLeft={() => <ArrowdownSvg />} style={GlobalStyles.transferButton} status="control">
        {() => <Text style={GlobalStyles.textButton}>Receive</Text>}
      </Button>
    </View>
  );
};
