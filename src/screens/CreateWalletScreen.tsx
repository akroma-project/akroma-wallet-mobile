import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { useContext, useState } from 'react';
import { Button, Input, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useDatabaseConnection } from '../data/connection';
import { WalletContext } from '../providers/WalletProvider';
import { AkromaRn } from 'akroma-react-native';

export const CreateWalletScreen = () => {
  const nav = useNavigation();
  const { walletsRepository } = useDatabaseConnection();
  const { addWallet } = useContext(WalletContext);
  const [pin, pinChange] = useState('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const OnCreateWalletPress = async () => {
    setLoading(true);
    const akromaRn = new AkromaRn();
    const keystore = await akromaRn.createKeystore(pin);
    console.debug('OnCreateWalletPress: ', keystore);
    // const t = typeof(keystore);
    const s = JSON.stringify(keystore);
    console.debug('keystore-type:', s);
    const wallet = await akromaRn.loadWallet(s, pin);
    console.debug('wallet', wallet);

    const created = await walletsRepository.create({
      name: name,
      address: wallet.address,
      pin: pin,
      encrypted: s,
    });
    addWallet(created);
    setLoading(false);
    pinChange('');
    setName('');
    nav.goBack();
  };

  if (loading === true) {
    return <Text>Spinner....</Text>;
  }

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={GlobalStyles.container}>
        <View>
          <Input style={GlobalStyles.input} onChangeText={setName} value={name} placeholder="Wallet name" disabled={loading} />
          <Input style={GlobalStyles.input} onChangeText={pinChange} value={pin} placeholder="123456" disabled={loading} keyboardType="number-pad" />
          <Button disabled={loading} onPress={async () => await OnCreateWalletPress()}>
            CREATE WALLET
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
