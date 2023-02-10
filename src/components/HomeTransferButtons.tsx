import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import ArrowdownSvg from '../assets/svg/ArrowdownSvg';
import ArrowupSvg from '../assets/svg/ArrowupSvg';
import GlobalStyles from '../constants/GlobalStyles';

export const HomeTransferButtons = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();

  return (
    <View style={[GlobalStyles.transferButtonsContainer]}>
      <Button accessoryLeft={() => <ArrowupSvg />} style={GlobalStyles.transferButton} onPress={() => navigator.navigate('SendCoinScreen')} status="control">
        {() => <Text style={GlobalStyles.textButton}>Send</Text>}
      </Button>
      <Button accessoryLeft={() => <ArrowdownSvg />} style={GlobalStyles.transferButton} onPress={() => navigator.navigate('ReceiveCoinScreen')} status="control">
        {() => <Text style={GlobalStyles.textButton}>Receive</Text>}
      </Button>
    </View>
  );
};
