import * as React from 'react';
import { ActivityIndicator, Keyboard, SafeAreaView, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useState, useContext, useEffect } from 'react';
import { Button, Icon, Input, Text } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { ImageOverlay } from '../../extra/image-overlay.component';
import { isAddress } from 'ethers/lib/utils';
import Toast from 'react-native-toast-message';
import { WalletContext } from '../../providers/WalletProvider';
import { GlobalContext } from '../../providers/GlobalProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';

export const ImportWalletWatch = ({ route }: { route: any }) => {
  const walletDirection = route.params?.address ?? '';
  const { walletsRepository } = useDatabaseConnection();
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const isValidAddress = isAddress(walletAddress);
  const { addWallet } = useContext(WalletContext);

  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();

  useEffect(() => {
    setWalletAddress(walletDirection);
  }, [walletDirection]);

  const onSuccessWatchWallet = () => {
    setName('');
    setWalletAddress('');
    Toast.show({
      text1: 'The wallet is saved',
      position: 'top',
    });
  };

  const OnImportPress = async () => {
    setLoading(true);
    if (!isValidAddress) {
      Toast.show({
        type: 'error',
        text1: 'The address is no valid',
        position: 'top',
      });
      setLoading(false);
      return;
    }
    setTimeout(async () => {
      const created = await walletsRepository.create({
        name: name,
        address: walletAddress,
        pin: '0',
        encrypted: 'watch',
      });
      onSuccessWatchWallet();
      addWallet(created);
      setLoading(false);
    }, 1500);
  };

  const ScanIcon = (props: any) => {
    return (
      <TouchableOpacity onPress={() => navigator.navigate('ScannerScreen', { watchedWallet: true })}>
        <Icon {...props} name="video" />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.flex}>
        <ImageOverlay style={GlobalStyles.container} source={require('../../assets/images/background.png')}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={GlobalStyles.container}>
              <View style={{ marginTop: 30 }}>
                <Text style={{ color: 'white', fontSize: 14, paddingBottom: 8 }}>Address</Text>
                <Input style={GlobalStyles.input} onChangeText={setWalletAddress} value={walletAddress} placeholder="Enter address or Scan QR code" disabled={loading} accessoryRight={ScanIcon} />
                <Input style={GlobalStyles.input} onChangeText={setName} value={name} placeholder="Wallet name, min 5 chars" disabled={loading} />
                <Button disabled={loading} onPress={async () => await OnImportPress()}>
                  IMPORT
                </Button>
              </View>
            </View>
          )}
        </ImageOverlay>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
