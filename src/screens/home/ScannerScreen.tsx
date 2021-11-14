import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';

export const ScannerScreen = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();

  const onSuccess = (readEvent: BarCodeReadEvent) => {
    navigator.navigate('SendCoinScreen', { address: readEvent.data });
  };

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={GlobalStyles.centerCenter}>
        <QRCodeScanner vibrate={false} onRead={onSuccess} />
      </View>
    </SafeAreaView>
  );
};
