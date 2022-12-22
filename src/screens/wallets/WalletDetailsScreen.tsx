import * as React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { WalletContext } from '../../providers/WalletProvider';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { WalletsStackParamList } from '../../navigation/WalletsStackNavigator';
import { Card, Text } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { WalletModel } from '../../data/entities/wallet';
import Clipboard from '@react-native-clipboard/clipboard';
import { StackNavigationProp } from '@react-navigation/stack';
import formatNumber from '../../extra/numberFormat';

export const WalletDetailsScreen = ({ route }: { route: any }) => {
  const { walletsRepository } = useDatabaseConnection();
  console.debug(route.params.wallet.id);
  const { updateBalance, setActive, state } = useContext(WalletContext);

  type detailScreenProp = StackNavigationProp<WalletsStackParamList, 'WalletScreen'>;
  const navigator = useNavigation<detailScreenProp>();

  const wallet: WalletModel = route.params.wallet;

  const [refreshing] = useState(false);
  const onRefresh = async () => {
    await init();
  };

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

  useEffect(() => {
    const unsubscribe = navigator.addListener('focus', async () => {
      await init();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator]);

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

  const walletsCardHeader = () => (
    <View style={GlobalStyles.rowSpaceBetween}>
      <Text category="h6" style={GlobalStyles.p}>
        Name: {wallet.name}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <ScrollView style={GlobalStyles.container} contentContainerStyle={GlobalStyles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Card header={walletsCardHeader()}>
          <Text category="h4">{'Balance: ' + formatNumber(state.wallet.lastBalance as number)}</Text>
          <TouchableOpacity onPress={() => onCopyAddress()}>
            <Text>{state.wallet.address}</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
