import * as React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useContext, useState } from 'react';
import { Avatar, Button, Input } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { WalletContext } from '../../providers/WalletProvider';
import { AkromaRn } from 'akroma-react-native';
import { ImageOverlay } from '../../extra/image-overlay.component';
import { SettingsContext } from '../../providers/SettingsProvider';

export const CreateWalletScreen = () => {
  const { walletsRepository } = useDatabaseConnection();
  const { addWallet } = useContext(WalletContext);
  const { setOnboarded } = useContext(SettingsContext);

  const [pin, pinChange] = useState('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const OnCreateWalletPress = async () => {
    setLoading(true);
    setTimeout(async () => {
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
      await setOnboarded(true);
    }, 600);
  };

  const invalid = () => {
    if (name.length < 5) {
      return true;
    }
    if (pin.length < 4) {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <ImageOverlay style={GlobalStyles.container} source={require('../../assets/images/background.png')}>
        <View style={GlobalStyles.logoContainer}>
          <Avatar style={GlobalStyles.logoImage} source={require('../../assets/images/icon.png')} />
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={GlobalStyles.container}>
            <View>
              <Input style={GlobalStyles.input} onChangeText={setName} value={name} placeholder="Wallet name" disabled={loading} />
              <Input style={GlobalStyles.input} onChangeText={pinChange} value={pin} placeholder="123456" disabled={loading} keyboardType="number-pad" />
              <Button style={GlobalStyles.button} disabled={loading || invalid()} onPress={async () => await OnCreateWalletPress()}>
                CREATE WALLET
              </Button>
            </View>
          </View>
        )}
      </ImageOverlay>
    </SafeAreaView>
  );
};
