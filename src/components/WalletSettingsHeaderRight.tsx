import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { useDatabaseConnection } from '../data/connection';
import { WalletModel } from '../data/entities/wallet';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { GlobalContext } from '../providers/GlobalProvider';
import { WalletContext } from '../providers/WalletProvider';

interface RouteParamsI {
  wallet?: WalletModel;
}

export const WalletSettingsHeaderRight = () => {
  // contexts
  const { displayExport, setDisplayExport } = useContext(GlobalContext);
  const { removeWallet } = useContext(WalletContext);
  const { walletsRepository } = useDatabaseConnection();

  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'WalletScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const route = useRoute();
  const { showActionSheetWithOptions } = useActionSheet();

  const { wallet } = route.params as RouteParamsI;

  const DeleteWallet = async () => {
    return Alert.alert('Delete wallet?', 'Are you sure you want to delete this wallet?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          removeWallet(wallet);
          walletsRepository.delete(wallet.id).then(() => navigator.navigate('HomeScreen'));
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={() =>
        showActionSheetWithOptions(
          {
            options: ['Export', 'Delete'],
            cancelButtonIndex: 99,
            showSeparators: true,
          },
          async (index: number) => {
            if (index === 0) {
              setDisplayExport(!displayExport);
            }
            if (index === 1) {
              DeleteWallet();
            }
          },
        )
      }>
      <Icon name="menu-outline" style={GlobalStyles.iconRight} fill="#000000" />
    </TouchableOpacity>
  );
};
