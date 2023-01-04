import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { WalletModel } from '../data/entities/wallet';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
interface options {
  title: string;
  screen: string;
  params?: { wallet: WalletModel };
}

export const DetailsScreenHeaderRight = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'WalletScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const { showActionSheetWithOptions } = useActionSheet();

  const navigation = () => {
    showActionSheetWithOptions(
      {
        options: ['History Transactions', 'Wallet Settings'],
        cancelButtonIndex: 99,
        showSeparators: true,
      },
      async (index: number) => {
        if (index === 0) {
          navigator.navigate('WalletTransactionHistory');
        }
        if (index === 1) {
          navigator.navigate('WalletSettingsScreen', {
            wallet: JSON.parse(await AsyncStorage.getItem('walletSelected')),
          });
        }
      },
    );
  };

  return (
    <TouchableOpacity onPress={() => navigation()}>
      <Icon name="menu-outline" style={GlobalStyles.iconRight} fill="#000000" />
    </TouchableOpacity>
  );
};
