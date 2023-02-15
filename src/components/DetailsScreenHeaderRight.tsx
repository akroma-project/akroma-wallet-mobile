import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { WalletModel } from '../data/entities/wallet';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import ImportKeystoreSvg from '../assets/svg/ImportKeystoreSvg';
import BottomMenu from './BottomMenu';
interface options {
  title: string;
  screen: string;
  params?: { wallet: WalletModel };
}

export const DetailsScreenHeaderRight = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'WalletScreen'>;
  const navigator = useNavigation<homeScreenProp>();

  const [visible, setVisible] = useState(false);

  const hideMenu = () => {
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Icon name="more-vertical-outline" style={GlobalStyles.iconRight} fill="#fff" />
      </TouchableOpacity>
      <BottomMenu
        visible={visible}
        onBackdropPress={hideMenu}
        onBackButtonPress={hideMenu}
        onDismiss={hideMenu}
        optionList={[
          {
            icon: <ImportKeystoreSvg />,
            text: 'Export Keystore',
            onPress: async () =>
              navigator.navigate('ExportWalletScreen', {
                oldWallet: true,
              }),
          },
        ]}
      />
    </>
  );
};
