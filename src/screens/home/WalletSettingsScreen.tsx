import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import * as CloudStore from 'react-native-cloud-store';
import { RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View, Platform } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GDrive, MimeTypes } from '@robinbobin/react-native-google-drive-api-wrapper';
import { defaultICloudContainerPath } from 'react-native-cloud-store';

import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { WalletContext } from '../../providers/WalletProvider';
import { Button, Card, Icon, Input, Modal, Text } from '@ui-kitten/components';
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
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState<string>();
  const onRefresh = React.useCallback(() => {}, []);

  const { displayExport } = useContext(GlobalContext);

  useEffect(() => {
    setActive(wallet.id);
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

  const exportMessage = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  const downloadKeystore = () => {
    const fileName = getKeystoreFileName();
    const fullPath = `${path}/${fileName}.json`;
    const androidpath = `${RNFS.DownloadDirectoryPath}/${fileName}.json`;

    // write the keystore file
    RNFS.writeFile(Platform.OS === 'android' ? androidpath : fullPath, wallet.encrypted, 'utf8')
      .then(() => {
        exportMessage('File downloaded in file system');
        console.debug('file written');
      })
      .catch(_err => {
        // console.log(err.message);
      });
  };

  const exportToIcloud = async () => {
    const isAvailable = await CloudStore.isICloudAvailable();
    const fileName = getKeystoreFileName();
    const filePathForWrite = `${defaultICloudContainerPath}/Documents/${fileName}.json`;

    if (isAvailable) {
      try {
        await CloudStore.writeFile(filePathForWrite, wallet.encrypted, { override: true });
        exportMessage('File uploaded to Icloud Drive');
        console.debug('file uploaded to Icloud drive');
      } catch (e) {
        console.error(e);
      }
    } else {
      console.debug('You should login with your apple id');
    }
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

    exportMessage('File uploaded to Google Drive');
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
            <Button style={GlobalStyles.exportBtn} onPress={() => downloadKeystore()}>
              Download to File system
            </Button>
            <Button style={GlobalStyles.exportBtn} onPress={() => exportToGoogleDrive()}>
              Export to Google drive
            </Button>

            {Platform.OS === 'ios' && (
              <Button style={GlobalStyles.exportBtn} onPress={() => exportToIcloud()}>
                Export to Icloud Drive
              </Button>
            )}
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
      <Modal visible={visible}>
        <Card disabled={true}>
          <Text>{message}</Text>
          <Button style={GlobalStyles.exportModalBtn} onPress={() => setVisible(false)}>
            Ok
          </Button>
        </Card>
      </Modal>
    </SafeAreaView>
  );
};
