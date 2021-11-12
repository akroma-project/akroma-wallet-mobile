import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@ui-kitten/components';
import * as React from 'react';
import { View } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { ReceiveIcon, SendIcon, SettingsIcon } from './AppIcons';

export const WalletActionButtons = (props: any) => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <Button style={GlobalStyles.button} accessoryRight={ReceiveIcon} onPress={() => navigator.push('ReceiveCoinScreen')} />
      <Button style={GlobalStyles.button} accessoryRight={SendIcon} onPress={() => navigator.push('SendCoinScreen')} />
      <Button accessoryRight={SettingsIcon} style={GlobalStyles.button} onPress={() => navigator.push('WalletSettingsScreen', { wallet: props.wallet })} />
    </View>
  );
};
