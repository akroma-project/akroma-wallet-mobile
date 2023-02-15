import React, { useEffect, useState, useContext, useRef } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, TouchableOpacity, View, RefreshControl, StyleSheet, Animated } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { WalletContext } from '../../providers/WalletProvider';
import { Input, Button, Text, ListItem } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useNavigation } from '@react-navigation/core';
import { Utils } from 'typesafe-web3/dist/lib/utils';
import { TransactionCard } from '../../components/TransactionCard';
import { WalletModel } from '../../data/entities/wallet';
import _ from 'lodash';
import { GlobalContext } from '../../providers/GlobalProvider';
import { GradientOverlay } from '../../extra/background-overlay.component';
import QRCodeIcon from '../../assets/svg/QRcodeIconSvg';
import { ArrowForwardIcon } from '../../components/AppIcons';
import ArrowDownSelectSvg from '../../assets/svg/ArrowDownSelectSvg';
import { WalletsRender } from '../../components/WalletsRender';

export const SendCoinScreen = ({ route }: { route: any }) => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();

  const sendToAddress = route.params?.address ?? '';
  const [isWatchingActive, setIsWatchingActive] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [sending, setSending] = useState(false);
  const { send, state, loadWallets } = useContext(WalletContext);
  const { setNewWatchWallet } = useContext(GlobalContext);
  const u = new Utils();
  const walletsListPosition = useRef(new Animated.Value(-600)).current;

  const addToWatchList = () => {
    setNewWatchWallet(address);
    navigator.navigate('ImportWalletWatch');
  };

  useEffect(() => {
    setAddress(sendToAddress);
  }, [sendToAddress]);

  useEffect(() => {
    async function init() {
      setTimeout(async () => {
        await loadWallets();
      }, 500);
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onWalletPress = async (wallet: WalletModel) => {
    setAddress(wallet.address);
  };

  const [refreshing] = React.useState(false);
  const onRefresh = async () => {
    await loadWallets();
  };

  const sendAmount = async () => {
    setSending(true);
    setStatus('In Progress');
    setTimeout(async () => {
      setShowStatus(true);
      await send(address, amount);
      setStatus('Successful');
      navigator.navigate('SuccessScreen', { message: 'The transfer was succesfully sent' });
    }, 600);
  };
  const anotherSend = () => {
    setSending(false);
    setShowStatus(false);
    setStatus('');
    setAddress('');
    setAmount('');
  };
  const OnSendPress = async () => {
    if (u.isAddress(address) === false) {
      console.debug('not an address');
      return;
    }
    const sendA = u.toDecimal(amount);
    const minA = u.toDecimal(0.0000001);
    // console.debug(sendA, minA);
    if (sendA < minA) {
      console.debug('invalid amount');
      return;
    }
    if (sendA >= state.wallet.lastBalance) {
      console.debug('not enough in wallet');
      return;
    }
    Alert.alert('Send AKA?', `Send ${amount}aka to \r\n${address}`, [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: sendAmount,
      },
      {
        text: 'No',
      },
    ]);
  };

  const ScanIcon = () => {
    return (
      <TouchableOpacity onPress={() => navigator.navigate('ScannerScreen')}>
        <QRCodeIcon />
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

  const walletExists = (): boolean => {
    return !!state.wallets.find(wallet1 => wallet1.address === address);
  };

  const handlerAnimationList = () => {
    Animated.timing(walletsListPosition, {
      toValue: 60,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <GradientOverlay style={GlobalStyles.flex}>
        <View style={[GlobalStyles.mt20percent, GlobalStyles.p20]}>
          {sending || showStatus ? (
            <View>
              <TransactionCard sent={true} addressFrom={state.wallet.address} amount={amount} addressTo={address} status={status} />
              <View style={GlobalStyles.mt20}>{status === 'Successful' || status === 'Error' ? <Button onPress={anotherSend}>Make another Transaction</Button> : <ActivityIndicator size="large" />}</View>
              {!walletExists() && status === 'Successful' && (
                <View style={GlobalStyles.mt20}>
                  <Button onPress={addToWatchList}>Add to Watch List</Button>
                </View>
              )}
            </View>
          ) : (
            <View>
              <View style={Styles.tabContainer}>
                <TouchableOpacity onPress={() => setIsWatchingActive(false)}>
                  <Text style={[Styles.tabText, { borderBottomColor: !isWatchingActive ? 'white' : 'rgba(0,0,0,0)' }]}>Enter Address</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsWatchingActive(true)}>
                  <Text style={[Styles.tabText, { borderBottomColor: isWatchingActive ? 'white' : 'rgba(0,0,0,0)' }]}>Watching</Text>
                </TouchableOpacity>
              </View>
              <Text style={Styles.inputText}>Address</Text>
              {isWatchingActive ? (
                <TouchableOpacity style={Styles.arrowContainer} onPress={() => handlerAnimationList()}>
                  <Text style={Styles.selectText}>Select</Text>
                  <ArrowDownSelectSvg />
                </TouchableOpacity>
              ) : (
                <Input style={GlobalStyles.input} onChangeText={setAddress} disabled={isWatchingActive} value={address} placeholder="Enter address or Scan QR code" accessoryRight={ScanIcon} />
              )}
              <Text style={[Styles.inputText, GlobalStyles.mt20]}>Amount</Text>
              <Input style={GlobalStyles.input} onChangeText={setAmount} value={amount} placeholder="Amount to send" keyboardType="number-pad" />
              <Button style={[GlobalStyles.akromaRedButton, GlobalStyles.mt20]} disabled={invalid()} onPress={OnSendPress} accessoryRight={ArrowForwardIcon}>
                Send
              </Button>

              {/* <ScrollView style={GlobalStyles.walletsList} contentContainerStyle={GlobalStyles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {state.wallets.length > 0 &&
                  _.sortBy(
                    state.wallets.filter(wallet1 => wallet1.address !== state.wallet.address),
                    x => x.address,
                  ).map((item, index) => <ListItem key={index} title={item.name} description={item.address} onPress={() => onWalletPress(item)} />)}
              </ScrollView> */}
            </View>
          )}
        </View>
        {isWatchingActive && (
          <Animated.View style={[Styles.walletList, { bottom: walletsListPosition }]}>
            <WalletsRender wallets={state.wallets} />
          </Animated.View>
        )}
      </GradientOverlay>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: '8%',
    marginBottom: '10%',
  },
  tabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 5,
    borderBottomWidth: 3,
  },
  inputText: {
    color: 'white',
    fontSize: 14,
    paddingBottom: 8,
  },
  arrowContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectText: {
    color: 'gray',
  },
  walletList: {
    position: 'absolute',
    width: '100%',
    bottom: -600,
  },
});
