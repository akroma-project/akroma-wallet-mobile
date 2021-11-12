import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useEffect, useState } from 'react';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';

export const ScannerScreen = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: any }) => {
    setScanned(true);
    console.debug(data);
    navigator.navigate('SendCoinScreen', { address: data });
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
        <View style={styles.formContainer}>
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={GlobalStyles.body} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  scanner: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  input: {
    marginVertical: 12,
  },
  formContainer: {
    flex: 0.9,
    justifyContent: 'center',
    // paddingTop: 32,
    // alignItems: 'center',
    paddingHorizontal: 16,
  },
  values: {
    paddingVertical: 30,
  },
});
