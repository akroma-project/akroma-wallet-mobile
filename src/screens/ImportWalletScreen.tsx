import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { useState } from 'react';
import { Button, Input, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useDatabaseConnection } from '../data/connection';
import { AkromaRn } from 'akroma-react-native';
const akromaRn = new AkromaRn();

export const ImportWalletScreen = () => {
  const nav = useNavigation();
  const { walletsRepository } = useDatabaseConnection();
  const [walletJson, walletJsonChange] = useState('');
  const [walletPassword, walletPasswordChange] = useState('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const OnImportPress = async () => {
    setLoading(true);
    try {
      const valid: Boolean = await akromaRn.validateKeystoreCreds(walletJson, walletPassword);
      if (valid) {
        const wallet = await akromaRn.loadWallet(walletJson, walletPassword);
        await walletsRepository.create({
          name: name,
          address: wallet.address,
          pin: walletPassword,
          encrypted: walletJson,
        });
        nav.goBack();
        console.debug(`wallet opened:: ${wallet}`);
      } else {
        console.debug('unable to load wallet');
      }
    } catch (error) {
      console.error(error);
      console.error('unable to open wallet');
    } finally {
      setLoading(false);
    }
  };

  if (loading === true) {
    return <Text>Spinner....</Text>;
  }

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
      <View style={GlobalStyles.container}>
        <View>
          <Input style={GlobalStyles.input} onChangeText={setName} value={name} placeholder="Wallet name, min 5 chars" disabled={loading} />
          <Input style={GlobalStyles.input} onChangeText={walletPasswordChange} value={walletPassword} placeholder="Wallet Password" disabled={loading} />
          <Input style={GlobalStyles.input} onChangeText={walletJsonChange} value={walletJson} numberOfLines={12} placeholder="Wallet JSON" disabled={loading} />
          <Button disabled={loading || invalid()} onPress={async () => await OnImportPress()}>
            IMPORT WALLET
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
