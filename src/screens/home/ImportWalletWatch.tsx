import * as React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useState } from 'react';
import { Button, Input } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { ImageOverlay } from '../../extra/image-overlay.component';

export const ImportWalletWatch = () => {
  const { walletsRepository } = useDatabaseConnection();
  const [walletAddress, walletAddressChange] = useState('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const OnImportPress = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        await walletsRepository.create({
          name: name,
          address: walletAddress,
          pin: '0',
          encrypted: 'watch',
        });
      }, 600);
    } catch (error) {
      console.error(error);
      console.error('unable to watch wallet');
    } finally {
      setLoading(false);
    }
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
              <Button disabled={loading} onPress={async () => await OnImportPress()}>
                IMPORT
              </Button>
            </View>
          </View>
        )}
      </ImageOverlay>
    </SafeAreaView>
  );
};
