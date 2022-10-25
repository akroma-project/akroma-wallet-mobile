import * as React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { WalletContext } from '../../providers/WalletProvider';
import { useContext, useEffect, useState } from 'react';
import { Card, Text } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { WalletModel } from '../../data/entities/wallet';
import Clipboard from '@react-native-clipboard/clipboard';
import { WalletActionButtons } from '../../components/WalletActionButtons';

export const WalletDetailsScreen = ({ route }: { route: any }) => {
  const { walletsRepository } = useDatabaseConnection();
  console.debug(route.params.wallet.id);
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

  const walletsCardHeader = () => (
    <View style={{ flex: 1, flexDirection: 'row', minHeight: 50, justifyContent: 'space-between' }}>
      <Text category="h6" style={{ paddingLeft: 0 }}>
        Name: {wallet.name}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <ScrollView style={GlobalStyles.container} contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Card header={walletsCardHeader()}>
          <Text category="h4">{'Balance:' + state.wallet.lastBalance?.toString()}</Text>
          <View style={{ paddingTop: 20 }} />

          <TouchableOpacity onPress={() => onCopyAddress()}>
            <Text>{state.wallet.address}</Text>
          </TouchableOpacity>
        </Card>
        <View style={GlobalStyles.actions}>
          <WalletActionButtons wallet={state.wallet} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
