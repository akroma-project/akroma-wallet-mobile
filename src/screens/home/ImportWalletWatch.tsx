import * as React from 'react';
import { ActivityIndicator, Keyboard, SafeAreaView, TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useState, useContext, useEffect } from 'react';
import { Button, Input, Text } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { isAddress } from 'ethers/lib/utils';
import Toast from 'react-native-toast-message';
import { WalletContext } from '../../providers/WalletProvider';
import QRCodeIcon from '../../assets/svg/QRcodeIconSvg';
import { ArrowForwardIcon } from '../../components/AppIcons';
import { GradientOverlay } from '../../extra/background-overlay.component';

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
    setLoading(false);
  };

  const validationMessage = (message: string) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'top',
    });
    setLoading(false);
  };

  const OnImportPress = async () => {
    setLoading(true);
    if (!isValidAddress) {
      validationMessage('The address is not valid');
      return;
    } else if (name.length < 5) {
      validationMessage('The wallet name should be at least 5 characters');
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
        <GradientOverlay style={GlobalStyles.container} source={require('../../assets/images/background.png')}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={GlobalStyles.container}>
              <View style={Styles.innerContainer}>
                <Text style={Styles.formText}>Address</Text>
                <Input style={GlobalStyles.input} onChangeText={setWalletAddress} value={walletAddress} placeholder="Enter address or Scan QR code" disabled={loading} accessoryRight={ScanIcon} />
                <Text style={Styles.formText}>Name</Text>
                <Input style={[GlobalStyles.input, GlobalStyles.marginBottom20]} onChangeText={setName} value={name} placeholder="Wallet name, min 5 chars" />
                <Button style={GlobalStyles.akromaRedButton} disabled={loading} onPress={async () => await OnImportPress()} accessoryRight={ArrowForwardIcon}>
                  Watch
                </Button>
              </View>
            </View>
          )}
          <Toast />
        </GradientOverlay>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleSheet.create({
  innerContainer: {
    marginTop: '15%',
  },
  formText: {
    color: 'white',
    fontSize: 14,
    paddingBottom: 8,
  },
});
