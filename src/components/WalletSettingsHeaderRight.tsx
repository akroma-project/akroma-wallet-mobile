import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { GlobalContext } from '../providers/GlobalProvider';

interface routeParams {
  wallet?: { id?: string };
}

export const WalletSettingsHeaderRight = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'WalletScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const route = useRoute();
  console.debug((route.params as routeParams).wallet.id);
  const { showActionSheetWithOptions } = useActionSheet();

  const { displayExport, setDisplayExport } = useContext(GlobalContext);

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
              navigator.navigate('SendCoinScreen');
            }
          },
        )
      }>
      <Icon name="menu-outline" style={GlobalStyles.iconRight} fill="#000000" />
    </TouchableOpacity>
  );
};
