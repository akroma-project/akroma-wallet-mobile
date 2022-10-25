import * as React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useState } from 'react';
import { Button, Input } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { AkromaRn } from 'akroma-react-native';
import { ImageOverlay } from '../../extra/image-overlay.component';
const akromaRn = new AkromaRn();

export const ImportWalletKeystore = () => {
  const { walletsRepository } = useDatabaseConnection();
  const [walletJson, walletJsonChange] = useState('');
  const [walletPassword, walletPasswordChange] = useState('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const OnImportPress = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const valid: Boolean = await akromaRn.validateKeystoreCreds(walletJson, walletPassword);
        if (valid) {
          const wallet = await akromaRn.loadWallet(walletJson, walletPassword);
          await walletsRepository.create({
            name: name,
            address: wallet.address,
            pin: walletPassword,
            encrypted: walletJson,
          });
          console.debug(`wallet opened:: ${wallet}`);
        } else {
          console.debug('unable to load wallet');
        }
      }, 600);
    } catch (error) {
      console.error(error);
      console.error('unable to open wallet');
    } finally {
      setLoading(false);
    }
  };

  const invalid = () => {
    if (name.length < 5) {
      return true;
    }
    if (walletPassword.length < 4) {
      return true;
    }
    if (walletJson.length < 4) {
      return true;
    }
    return false;
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
              <Input style={GlobalStyles.input} onChangeText={walletPasswordChange} value={walletPassword} placeholder="Current Wallet Password" disabled={loading} />
              <Input style={GlobalStyles.input} onChangeText={walletJsonChange} value={walletJson} numberOfLines={8} placeholder="Wallet JSON" disabled={loading} />
              <Button disabled={loading || invalid()} onPress={async () => await OnImportPress()}>
                IMPORT
              </Button>
            </View>
          </View>
        )}
      </ImageOverlay>
    </SafeAreaView>
  );
};
