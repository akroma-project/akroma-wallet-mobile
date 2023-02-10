import * as React from 'react';
import { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Card, Icon } from '@ui-kitten/components';
import GlobalStyles, { DymanicStyles } from '../constants/GlobalStyles';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import Modal from 'react-native-modal';
import CreateWalletSvg from '../assets/svg/CreateWalletSvg';

export const HomeScreenHeaderRight = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const { showActionSheetWithOptions } = useActionSheet();
  const [visible, setVisible] = useState(false);

  const [viewWidth, setViewWidth] = useState(Dimensions.get('screen').width);
  Dimensions.addEventListener('change', () => {
    setViewWidth(Dimensions.get('screen').width);
  });

  const menuActionSheet = () =>
    showActionSheetWithOptions(
      {
        options: ['Create Wallet', 'Import Keystore', 'Import Private Key', 'Import Seed Phrase', 'Watch Wallet', 'Cancel'],
        cancelButtonIndex: 5 || 99,
        destructiveButtonIndex: 5,
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
          navigator.navigate('ImportWalletWatch');
        }
      },
    );
  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Icon name="more-vertical-outline" style={GlobalStyles.iconRight} fill="#fff" />
      </TouchableOpacity>
      <Modal isVisible={visible} onDismiss={() => setVisible(false)} onBackButtonPress={() => setVisible(false)} onBackdropPress={() => setVisible(false)} style={[GlobalStyles.menuModal]}>
        <Card style={[DymanicStyles({ viewWidth }).menuCard]} disabled={true}>
          <View style={[GlobalStyles.displayFlex, GlobalStyles.flexRow]}>
            <CreateWalletSvg style={[GlobalStyles.mr10]} />
            <Text style={[GlobalStyles.menuOptionText]}>Create Wallet</Text>
          </View>
        </Card>
      </Modal>
    </>
  );
};
