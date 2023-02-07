// import { AkromaRn } from 'akroma-react-native/lib';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Platform, SafeAreaView, Text, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { GradientOverlay } from '../../extra/background-overlay.component';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { Button, Card } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
// export
import * as CloudStore from 'react-native-cloud-store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GDrive, MimeTypes } from '@robinbobin/react-native-google-drive-api-wrapper';
import { defaultICloudContainerPath } from 'react-native-cloud-store';

import { WalletModel } from '../../data/entities/wallet';
import RNFS from 'react-native-fs';
import { GOOGLESIGNIN_IOS_CLIENTID } from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletLogo = require('../../assets/images/icon.png');

export const ExportWalletScreen = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const [item, setItem] = useState('fileSystem');

  // Settings code
  const [wallet, setWallet] = useState<WalletModel>();
  const path = RNFS.DocumentDirectoryPath;
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState<string>();

  useEffect(() => {
    AsyncStorage.getItem('newCreatedWallet').then(walletString => {
      const walletObject = JSON.parse(walletString);
      setWallet(walletObject);
    });
  }, []);

  if (wallet === undefined) {
    return (
      <View>
        <Text>Loading wallet...please wait...</Text>
      </View>
    );
  }

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
      .catch(err => {
        console.log(err.message);
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

  // End settings code

  const exportKeystore = () => {
    console.log(item);
    if (item === 'fileSystem') {
      downloadKeystore();
    }
    if (item === 'iCloud') {
      exportToIcloud();
    }
    if (item === 'googleDrive') {
      exportToGoogleDrive();
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <GradientOverlay style={GlobalStyles.container}>
        <View style={[GlobalStyles.noticeContainer]}>
          <Image style={[GlobalStyles.walletLogoNotice]} source={WalletLogo} resizeMode="contain" />
          <View style={[GlobalStyles.themedPickerContainer]}>
            <Picker style={[GlobalStyles.fullWidth, GlobalStyles.themedPicker]} selectedValue={item} onValueChange={itemValue => setItem(itemValue)}>
              <Picker.Item label="Download to File system" value="fileSystem" />
              {Platform.OS === 'ios' && <Picker.Item label="Export to Icloud Drive" value="iCloud" />}
              <Picker.Item label="Google Drive" value="googleDrive" />
            </Picker>
          </View>
          {visible && (
            <View style={[GlobalStyles.fullWidth]}>
              <Text style={[GlobalStyles.mb10, GlobalStyles.textWhite]}>{message}</Text>
              <Button style={[GlobalStyles.akromaRedButton]} onPress={() => setVisible(false)}>
                Ok
              </Button>
            </View>
          )}
          <Button style={[GlobalStyles.akromaRedButton, GlobalStyles.fullWidth, GlobalStyles.continueButton]} onPress={() => exportKeystore()}>
            <Text>Export File</Text>
          </Button>
          <TouchableOpacity style={GlobalStyles.mt100} onPress={() => navigator.navigate('HomeScreen')}>
            <Text style={[GlobalStyles.textWhite, GlobalStyles.textBold]}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </GradientOverlay>
    </SafeAreaView>
  );
};
