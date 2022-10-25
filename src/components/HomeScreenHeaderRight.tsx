import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

export const HomeScreenHeaderRight = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <TouchableOpacity
      onPress={() =>
        showActionSheetWithOptions(
          {
            options: ['Create Wallet', 'Import Keystore', 'Import Private Key', 'Import Seed Phrase', 'Watch Wallet'],
            cancelButtonIndex: 99,
            showSeparators: true,
          },
          (index: number) => {
            if (index === 0) {
              navigator.navigate('CreateWalletScreen');
            }
            if (index === 1) {
              navigator.navigate('ImportWalletKeystore');
            }
            if (index === 2) {
              navigator.navigate('ImportWalletPrivateKey');
            }
            if (index === 3) {
              navigator.navigate('ImportWalletSeedPhrase');
            }
            if (index === 4) {
              console.debug('watch called');
              navigator.navigate('ImportWalletWatch');
            }
          },
        )
      }>
      <Icon name="menu-outline" style={GlobalStyles.iconRight} fill="#000000" />
    </TouchableOpacity>
  );
};
