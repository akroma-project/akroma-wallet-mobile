import * as React from 'react';
import { ActivityIndicator, Alert, SafeAreaView, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useState } from 'react';
import { WalletContext } from '../../providers/WalletProvider';
import { Input, Button, Text, Icon } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useNavigation } from '@react-navigation/core';
import { Utils } from 'typesafe-web3/dist/lib/utils';

export const SendCoinScreen = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [sending, setSending] = React.useState(false);
  const { send, state } = React.useContext(WalletContext);
  const u = new Utils();

  const OnSendPress = async () => {
    if (u.isAddress(address) === false) {
      console.debug('not an address');
      return;
    }
    const sendA = u.toDecimal(amount);
    const minA = u.toDecimal(0.0000001);
    console.debug(sendA, minA);
    if (sendA < minA) {
      console.debug('invalid amount');
      return;
    }
    if (sendA >= state.wallet.lastBalance) {
      console.debug('not enough in wallet');
      return;
    }
    return Alert.alert('Send AKA?', `Send ${amount}aka to \r\n${address}`, [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: async () => {
          setSending(true);
          setTimeout(async () => {
            await send(address, amount);
            setSending(false);
            setAddress('');
            setAmount('');
            navigator.goBack();
          }, 600);
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const ScanIcon = (props: any) => {
    return (
      <TouchableOpacity onPress={() => navigator.navigate('ScannerScreen')}>
        <Icon {...props} name="video" />
      </TouchableOpacity>
    );
  };

  const ContactIcon = (props: any) => {
    return (
      <TouchableOpacity>
        <Icon {...props} name="person" />
      </TouchableOpacity>
    );
  };

  const invalid = () => {
    if (u.isAddress(address) === false) {
      return true;
    }
    const sendA = u.toDecimal(amount);
    const minA = u.toDecimal(0.0000001);
    console.debug(sendA, minA);
    if (sendA < minA) {
      console.debug('invalid amount');
      return true;
    }
    if (sendA >= state.wallet.lastBalance) {
      console.debug('not enough in wallet');
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={GlobalStyles.container}>
        {sending ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            <Input style={GlobalStyles.input} onChangeText={setAddress} value={address} placeholder="To" accessoryLeft={ContactIcon} accessoryRight={ScanIcon} />

            <Input style={GlobalStyles.input} onChangeText={setAmount} value={amount} placeholder="Amount to send" keyboardType="number-pad" />
            <Button disabled={invalid()} onPress={OnSendPress}>
              SEND
            </Button>
            <Text style={GlobalStyles.label}>A confirm dialog will open before sending</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
