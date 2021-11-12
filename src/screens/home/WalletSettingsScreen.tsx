import * as React from 'react';
import { Alert, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { WalletContext } from '../../providers/WalletProvider';
import { useContext, useEffect, useState } from 'react';
import { Button, Card, Divider, Text } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { WalletModel } from '../../data/entities/wallet';
import Clipboard from '@react-native-clipboard/clipboard';

export const WalletSettingsScreen = ({ route }: { route: any }) => {
  const { walletsRepository } = useDatabaseConnection();
  console.debug(route.params.wallet.id);
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const { removeWallet, setActive, state } = useContext(WalletContext);

  const wallet: WalletModel = route.params.wallet;

  const [refreshing] = useState(false);
  const onRefresh = React.useCallback(() => {}, []);

  useEffect(() => {
    setActive(wallet.id);
  }, [setActive, wallet.id]);

  const DeleteWallet = async () => {
    return Alert.alert('Delete wallet?', 'Are you sure you want to delete this wallet?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          removeWallet(wallet);
          walletsRepository.delete(wallet.id).then(() => navigator.navigate('HomeScreen'));
        },
      },
      {
        text: 'No',
      },
    ]);
  };

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
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        flexDirection: 'row',
        minHeight: 50,
        justifyContent: 'space-between',
      }}>
      <Text category="h6" style={{ paddingLeft: 0 }}>
        Name: {wallet.name}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Card header={walletsCardHeader(state.wallet)}>
          <Text category="h4">{'Balance:' + state.wallet.lastBalance?.toString()}</Text>
          <View style={{ paddingTop: 20 }} />
          <TouchableOpacity onPress={() => onCopyAddress()}>
            <Text>{state.wallet.address}</Text>
          </TouchableOpacity>
          <Divider style={{ marginBottom: 10, marginTop: 10 }} />
        </Card>
        <View style={GlobalStyles.actions}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <Button>EXPORT</Button>
            <Button status="danger" disabled={refreshing} onPress={DeleteWallet}>
              DELETE
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
