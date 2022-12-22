import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View, Platform } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GDrive, MimeTypes } from '@robinbobin/react-native-google-drive-api-wrapper';

import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { WalletContext } from '../../providers/WalletProvider';
import { Button, Icon, Input, Text } from '@ui-kitten/components';
import { WalletModel } from '../../data/entities/wallet';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import { GlobalContext } from '../../providers/GlobalProvider';
import { GOOGLESIGNIN_IOS_CLIENTID } from '../../constants/constants';

export const WalletSettingsScreen = ({ route }: { route: any }) => {
  console.debug(route.params.wallet.id);
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const { setActive, state } = useContext(WalletContext);
  const wallet: WalletModel = route.params.wallet;
  const path = RNFS.DocumentDirectoryPath;
  const [refreshing] = useState(false);
  const onRefresh = React.useCallback(() => {}, []);

  const { displayExport } = useContext(GlobalContext);

  useEffect(() => {
    setActive(wallet.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.id]);

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

  const getKeystoreFileName = () => {
    const sanitizedWalletName = wallet.name.replace(/[^a-zA-Z0-9]/g, '');
    return `${sanitizedWalletName}.${wallet.address}`;
  };

  const downloadKeystore = () => {
    const fileName = getKeystoreFileName();
    const fullPath = `${path}/${fileName}.json`;
    const androidpath = `${RNFS.DownloadDirectoryPath}/${fileName}.json`;

    // write the keystore file
    RNFS.writeFile(Platform.OS === 'android' ? androidpath : fullPath, wallet.encrypted, 'utf8')
      .then(() => {
        console.debug('file written');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const exportToGoogleDrive = async () => {
    const fileName = getKeystoreFileName();
    const platformSetup = Platform.OS === 'android' ? { scopes: ['https://www.googleapis.com/auth/drive.file'] } : { iosClientId: GOOGLESIGNIN_IOS_CLIENTID };

    GoogleSignin.configure(platformSetup);
    await GoogleSignin.signIn();

    const gdrive = new GDrive();
    gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;

    const id = (
      await gdrive.files
        .newMultipartUploader()
        .setData(wallet.encrypted, MimeTypes.JSON)
        .setRequestBody({
          name: `${fileName}.json`,
        })
        .execute()
    ).id;

    console.debug('file uploaded to GDrive', id);
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Input status="basic" style={GlobalStyles.input} disabled={true} value={state.wallet.name} label="Name" />
        <Input style={GlobalStyles.input} disabled={true} value={state.wallet.lastBalance?.toString()} label="Balance" />

        {displayExport && (
          <>
            <Input style={GlobalStyles.input} disabled={true} value={wallet.pin} label="Password" accessoryRight={(props: any) => CopyIcon(props, wallet.pin)} />
            <Input style={GlobalStyles.input} disabled={true} value={wallet.encrypted} label="Keystore" accessoryRight={(props: any) => CopyIcon(props, wallet.encrypted)} />
            <Button onPress={() => downloadKeystore()}>Download keystore file</Button>
            <Button style={GlobalStyles.exportBtn} onPress={() => exportToGoogleDrive()}>
              Export to Google drive
            </Button>
          </>
        )}
        {/* <View style={GlobalStyles.actions}>
          <View style={GlobalStyles.rowSpaceBetween}>
            <Button onPress={() => setDisplayExport(!displayExport)}>EXPORT</Button>

            <Button status="danger" disabled={refreshing} onPress={DeleteWallet}>
              DELETE
            </Button>
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};
