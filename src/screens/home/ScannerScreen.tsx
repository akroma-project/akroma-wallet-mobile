import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';

import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
export const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();

  const onSuccess = (readEvent: string) => {
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
  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={GlobalStyles.centerCenter}>
        {device != null && hasPermission && (
          <>
            <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} frameProcessor={frameProcessor} frameProcessorFps={5} />
            {barcodes.map(barcode => onSuccess(barcode.displayValue))}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
