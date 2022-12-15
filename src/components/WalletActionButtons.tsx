import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@ui-kitten/components';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

export const WalletActionButtons = (props: any) => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const navigate = location => {
    navigator.navigate(location);
  };

  return (
    <View style={GlobalStyles.rowSpaceBetween}>
      <Button style={styles.button} onPress={() => navigate('ReceiveCoinScreen')}>
        Receive
      </Button>

      <Button style={styles.button} onPress={() => navigate('SendCoinScreen')}>
        Send
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 120,
  },
});
