import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';

import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

export const ScannerScreen = ({ route }: { route: any }) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [codeValue, setCodeValue] = React.useState('');
  const devices = useCameraDevices();
  const device = devices.back;
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const scanWatchWallet = route.params?.watchedWallet ?? false;

  const onSuccess = (readEvent: string) => {
    if (scanWatchWallet) {
      navigator.navigate('ImportWalletWatch', { address: readEvent });
      return;
    }

    navigator.navigate('SendCoinScreen', { address: readEvent });
  };
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    if (codeValue) {
      onSuccess(codeValue);
    }
  }, [codeValue]);
  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={GlobalStyles.centerCenter}>
        {device !== undefined && hasPermission && (
          <>
            <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} frameProcessor={frameProcessor} frameProcessorFps={5} />
            {codeValue.length < 1 && barcodes.map(barcode => setCodeValue(barcode.displayValue))}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
