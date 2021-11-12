import * as React from 'react';
import { Alert, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { WalletContext } from '../../providers/WalletProvider';
import { useContext, useEffect, useState } from 'react';
import { Button, Icon, Input, Text } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { WalletModel } from '../../data/entities/wallet';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

export const WalletSettingsScreen = ({ route }: { route: any }) => {
  const { walletsRepository } = useDatabaseConnection();
  console.debug(route.params.wallet.id);
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const { removeWallet, setActive, state } = useContext(WalletContext);
  const [displayExport, setDisplayExport] = useState(false);
  const wallet: WalletModel = route.params.wallet;

  const [refreshing] = useState(false);
  const onRefresh = React.useCallback(() => { }, []);

  useEffect(() => {
    setActive(wallet.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.id]);

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

  if (state.wallet === undefined) {
    return (
      <View>
        <Text>Loading wallet...please wait...</Text>
      </View>
    );
  }

  const CopyIcon = (props: any, value: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(value);
          Toast.show({
            type: 'info',
            text1: 'Copied to the clipboard',
            position: 'bottom',
          });
        }}>
        <Icon {...props} name="copy" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Input style={GlobalStyles.input} disabled={true} value={state.wallet.name} label="Name" />
        <Input style={GlobalStyles.input} disabled={true} value={state.wallet.lastBalance?.toString()} label="Balance" />
        {displayExport && (
          <>
            <Input style={GlobalStyles.input} disabled={true} value={wallet.pin} label="Password" accessoryRight={(props: any) => CopyIcon(props, wallet.pin)} />
            <Input style={GlobalStyles.input} disabled={true} value={wallet.encrypted} label="Keystore" accessoryRight={(props: any) => CopyIcon(props, wallet.encrypted)} />
          </>
        )}
        <View style={GlobalStyles.actions}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <Button onPress={() => setDisplayExport(!displayExport)}>EXPORT</Button>
            <Button status="danger" disabled={refreshing} onPress={DeleteWallet}>
              DELETE
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
