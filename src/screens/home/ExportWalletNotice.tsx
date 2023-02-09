// import { AkromaRn } from 'akroma-react-native/lib';

import * as React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { GradientOverlay } from '../../extra/background-overlay.component';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import ArrowRightSvg from '../../assets/svg/ArrowRightSvg';
import { Button } from '@ui-kitten/components';

const WalletLogo = require('../../assets/images/icon.png');

export const ExportWalletNotice = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <GradientOverlay style={GlobalStyles.container}>
        <View style={[GlobalStyles.noticeContainer]}>
          <Image style={[GlobalStyles.walletLogoNotice]} source={WalletLogo} resizeMode="contain" />
          <View style={[GlobalStyles.titleContainer]}>
            <Text style={[GlobalStyles.noticeWhiteTitle]}>Export your wallet key</Text>
          </View>
          <Text style={[GlobalStyles.noticeWhiteTextContent]}>
            Exporting and saving your wallet key is a way to ensure that you can regain access to your wallet in case you lose or forget your login information. This key is a unique code that can be used to restore access to your wallet, so
            it is important to keep it in a safe place and make multiple copies. It's also recommended to encrypt the key for added security.
          </Text>
          <Button style={[GlobalStyles.akromaRedButton, GlobalStyles.fullWidth, GlobalStyles.continueButton]} onPress={() => navigator.navigate('ExportWalletScreen')}>
            <Text>
              Continue <ArrowRightSvg />
            </Text>
          </Button>
        </View>
      </GradientOverlay>
    </SafeAreaView>
  );
};
