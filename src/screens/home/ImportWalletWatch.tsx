import * as React from 'react';
import { ActivityIndicator, Keyboard, SafeAreaView, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useState, useContext, useEffect } from 'react';
import { Button, Input, Text } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { ImageOverlay } from '../../extra/image-overlay.component';
import { isAddress } from 'ethers/lib/utils';
import Toast from 'react-native-toast-message';
import { WalletContext } from '../../providers/WalletProvider';
import QRCodeIcon from '../../assets/svg/QRcodeIconSvg';
import { ArrowForwardIcon } from '../../components/AppIcons';

export const ImportWalletWatch = ({ route, navigation }) => {
  const walletDirection = route.params?.address ?? '';
  const { walletsRepository } = useDatabaseConnection();
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const isValidAddress = isAddress(walletAddress);
  const { addWallet } = useContext(WalletContext);

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
      navigation.navigate('HomeScreen');
    }, 1500);
  };

  const ScanIcon = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ScannerScreen', { watchedWallet: true })}>
        <QRCodeIcon />
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
                <Text style={{ color: 'white', fontSize: 14, paddingBottom: 8 }}>Name</Text>
                <Input style={[GlobalStyles.input, GlobalStyles.marginBottom20]} onChangeText={setName} value={name} placeholder="Wallet name, min 5 chars" />
                <Button style={GlobalStyles.akromaRedButton} disabled={loading} onPress={async () => await OnImportPress()} accessoryRight={ArrowForwardIcon}>
                  Watch
                </Button>
              </View>
            </View>
          )}
        </ImageOverlay>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
