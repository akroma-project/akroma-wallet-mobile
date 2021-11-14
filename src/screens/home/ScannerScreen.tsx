import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useEffect, useState } from 'react';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { GoogleVisionBarcodesDetectedEvent, RNCamera } from 'react-native-camera';

export const ScannerScreen = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    (async () => {
      //const { status } = await BarCodeScanner.requestPermissionsAsync();
      //setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (event: GoogleVisionBarcodesDetectedEvent) => {
    setScanned(true);
    console.debug(event);
    navigator.navigate('SendCoinScreen', { address: event.barcodes[0].data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={GlobalStyles.container}>
        {/* <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={GlobalStyles.body} /> */}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          type={RNCamera.Constants.Type.back}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          style={styles.scanner}
          onGoogleVisionBarcodesDetected={handleBarCodeScanned}
        />
        {/* <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
       */}
      </View>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  // add the following
  scanner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
