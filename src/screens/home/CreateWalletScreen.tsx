import * as React from 'react';
import { ActivityIndicator, Keyboard, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useContext, useState } from 'react';
import { Avatar, Input } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { WalletContext } from '../../providers/WalletProvider';
import { AkromaRn } from '@akroma-project/akroma-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ButtonDesign } from '../../components/ButtonDesign';

export const CreateWalletScreen = () => {
  const { walletsRepository } = useDatabaseConnection();
  const { addWallet } = useContext(WalletContext);

  const [pin, pinChange] = useState('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [isPinValid, setIsPinValid] = useState<boolean>(false);

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
    }, 600);
  };

  const validateName = (newName: string) => {
    setName(newName);
    setIsNameValid(newName.length >= 5);
  };

  const validatePin = (newPin: string) => {
    pinChange(newPin);
    setIsPinValid(newPin.length >= 4);
  };

  const invalid = () => {
    return !isNameValid || !isPinValid;
  };

  const renderCaption = (text: string, display: boolean) => {
    return display ? (
      <View>
        <Text style={GlobalStyles.captionText}>{text}</Text>
      </View>
    ) : (
      ' '
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.flex}>
        <LinearGradient colors={['#4C4C52', '#050505']} style={{ flex: 1 }}>
          <View style={GlobalStyles.logoContainer}>
            <Avatar style={GlobalStyles.logoImage} source={require('../../assets/images/icon.png')} />
          </View>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={GlobalStyles.container}>
              <View>
                <Input style={GlobalStyles.input} onChangeText={validateName} value={name} placeholder="Enter a Wallet name" disabled={loading} caption={renderCaption('Should contain at least 5 characters', !isNameValid)} />
                <Input style={GlobalStyles.input} onChangeText={validatePin} value={pin} placeholder="Enter a Pin" disabled={loading} keyboardType="number-pad" caption={renderCaption('Should contain at least 4 numbers', !isPinValid)} />
                <ButtonDesign disabled={loading || invalid()} pressioned={OnCreateWalletPress} textBtn={'Create Wallet'} />
              </View>
            </View>
          )}
        </LinearGradient>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
