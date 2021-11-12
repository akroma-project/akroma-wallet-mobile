import * as React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { WalletContext } from '../../providers/WalletProvider';
import { useContext, useEffect, useState } from 'react';
import { Button, Card, Divider, Text } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { WalletModel } from '../../data/entities/wallet';
import { ReceiveIcon, SendIcon, SettingsIcon } from '../../components/AppIcons';
import Clipboard from '@react-native-clipboard/clipboard';

export const WalletScreen = ({ route }: { route: any }) => {
  const { walletsRepository } = useDatabaseConnection();
  console.debug(route.params.wallet.id);
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const { updateBalance, setActive, state } = useContext(WalletContext);

  const wallet: WalletModel = route.params.wallet;

  const [refreshing] = useState(false);
  const onRefresh = React.useCallback(() => {}, []);

  useEffect(() => {
    async function init() {
      setActive(wallet.id);
      console.debug('wallet-screen: useEffect: update called');
      const previous = wallet.lastBalance;
      const updated = await updateBalance(wallet.id);
      if (updated.lastBalance !== previous) {
        console.debug(`old: ${previous} new: ${updated.lastBalance}`);
        console.debug('useEffect: updating database with new blance');
        await walletsRepository.update(updated);
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.id]);

  const onCopyAddress = () => {
    Clipboard.setString(wallet.address);
  };

  if (state.wallet === undefined) {
    return (
      <View>
        <Text>Loading wallet...please wait...</Text>
      </View>
    );
  }

  const walletsCardHeader = (wallet: WalletModel) => (
    <View style={{ flex: 1, flexDirection: 'row', minHeight: 50, justifyContent: 'space-between' }}>
      <Text category="h6" style={{ paddingLeft: 0 }}>
        Name: {wallet.name}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Card header={walletsCardHeader(state.wallet)}>
          <Text category="h4">{'Balance:' + state.wallet.lastBalance?.toString()}</Text>
          <View style={{ paddingTop: 20 }} />

          <TouchableOpacity onPress={() => onCopyAddress()}>
            <Text>{state.wallet.address}</Text>
          </TouchableOpacity>
          <Divider style={{ marginBottom: 10, marginTop: 10 }} />
        </Card>
        <View style={GlobalStyles.actions}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Button style={GlobalStyles.button} accessoryRight={ReceiveIcon} onPress={() => navigator.push('ReceiveCoinScreen')}></Button>
            <Button style={GlobalStyles.button} accessoryRight={SendIcon} onPress={() => navigator.push('SendCoinScreen')}></Button>
            <Button accessoryRight={SettingsIcon} style={GlobalStyles.button} onPress={() => navigator.push('WalletSettingsScreen', { wallet: state.wallet })}></Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
