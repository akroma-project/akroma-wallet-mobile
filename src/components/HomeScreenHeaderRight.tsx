import * as React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import GlobalStyles from '../constants/GlobalStyles';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import BottomMenu from './BottomMenu';
import CreateWalletSvg from '../assets/svg/CreateWalletSvg';
import ImportKeystoreSvg from '../assets/svg/ImportKeystoreSvg';
import ImportWalletPrivateKeySvg from '../assets/svg/ImportPrivateKeySvg';
import ImportWalletSeedPhraseSvg from '../assets/svg/ImportSeedPhraseSvg';
import ImportWalletWatchSvg from '../assets/svg/WatchWalletSvg';

export const HomeScreenHeaderRight = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
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
            icon: <CreateWalletSvg />,
            text: 'Create Wallet',
            onPress: () => navigator.navigate('CreateWalletScreen'),
          },
          {
            icon: <ImportKeystoreSvg />,
            text: 'Import Keystore',
            onPress: () => navigator.navigate('ImportWalletKeystore'),
          },
          {
            icon: <ImportWalletPrivateKeySvg />,
            text: 'Import Private Key',
            onPress: () => navigator.navigate('ImportWalletPrivateKey'),
          },
          {
            icon: <ImportWalletSeedPhraseSvg />,
            text: 'Import Seed Phrase',
            onPress: () => navigator.navigate('ImportWalletSeedPhrase'),
          },
          {
            icon: <ImportWalletWatchSvg />,
            text: 'Watch Wallet',
            onPress: () => navigator.navigate('ImportWalletWatch'),
          },
        ]}
      />
    </>
  );
};
