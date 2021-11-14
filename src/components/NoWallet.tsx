import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@ui-kitten/components';
import * as React from 'react';
import GlobalStyles from '../constants/GlobalStyles';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

export const NoWallet = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();

  return (
    <>
      <Button style={GlobalStyles.button} onPress={() => navigator.navigate('CreateWalletScreen')}>
        CREATE WALLET
      </Button>
    </>
  );
};
