import * as React from 'react';
import { ActivityIndicator, Alert, SafeAreaView, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useState } from 'react';
import { Button, Input } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { ImageOverlay } from '../../extra/image-overlay.component';
import { isAddress } from 'ethers/lib/utils';

export const ImportWalletWatch = () => {
  const { walletsRepository } = useDatabaseConnection();
  const [walletAddress, walletAddressChange] = useState('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const isValidAddress = isAddress(walletAddress);

  const onSuccessWatchWallet = () => {
    setName('');
    walletAddressChange('');
    Alert.alert('The wallet is saved');
  };

  const OnImportPress = () => {
    setLoading(true);

    if (!isValidAddress) {
      Alert.alert('The address is no valid');
      setLoading(false);
      return;
    }
    setTimeout(() => {
      walletsRepository
        .create({
          name: name,
          address: walletAddress,
          pin: '0',
          encrypted: 'watch',
        })
        .then(onSuccessWatchWallet)
        .finally(() => setLoading(false));
    }, 1500);
  };

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <ImageOverlay style={GlobalStyles.container} source={require('../../assets/images/background.png')}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={GlobalStyles.container}>
            <View>
              <Input style={GlobalStyles.input} onChangeText={setName} value={name} placeholder="Wallet name, min 5 chars" disabled={loading} />
              <Input style={GlobalStyles.input} onChangeText={walletAddressChange} value={walletAddress} placeholder="Wallet Address" disabled={loading} />
              <Button disabled={loading} onPress={OnImportPress}>
                IMPORT
              </Button>
            </View>
          </View>
        )}
      </ImageOverlay>
    </SafeAreaView>
  );
};
