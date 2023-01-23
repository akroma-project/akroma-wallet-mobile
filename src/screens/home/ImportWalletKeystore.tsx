import * as React from 'react';
import { ActivityIndicator, Keyboard, Platform, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useState } from 'react';
import { Button, Input } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { AkromaRn } from '@akroma-project/akroma-react-native';
import { ImageOverlay } from '../../extra/image-overlay.component';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';
import { checkPermission } from '../../utils/Permissions';
import { WalletContext } from '../../providers/WalletProvider';
import Toast from 'react-native-toast-message';

const akromaRn = new AkromaRn();
const permissionsRequiered = [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];

export const ImportWalletKeystore = () => {
  const { addWallet, refreshWallets, loadWallets } = React.useContext(WalletContext);

  const { walletsRepository } = useDatabaseConnection();
  const [walletJson, walletJsonChange] = useState('');
  const [walletPassword, walletPasswordChange] = useState('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      (async () => await checkPermission(permissionsRequiered))();
    }
  }, []);
  const cleanInputs = () => {
    walletJsonChange('');
    walletPasswordChange('');
    setName('');
  };
  const OnImportPress = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const valid: Boolean = await akromaRn.validateKeystoreCreds(walletJson, walletPassword);
        if (valid) {
          const wallet = await akromaRn.loadWallet(walletJson, walletPassword);
          const created = await walletsRepository.create({
            name: name,
            address: wallet.address,
            pin: walletPassword,
            encrypted: walletJson,
          });
          addWallet(created);
          await refreshWallets();
          await loadWallets();
          console.debug(`wallet opened:: ${wallet}`);
          cleanInputs();
          Toast.show({
            type: 'success',
            text1: 'Imported wallet.',
            position: 'top',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'unable to load wallet',
            position: 'top',
          });
        }
      }, 600);
    } catch (error) {
      console.error(error);
      console.error('unable to open wallet');
    } finally {
      setLoading(false);
    }
  };

  const invalid = () => {
    if (name.length < 5) {
      return true;
    }
    if (walletPassword.length < 4) {
      return true;
    }
    if (walletJson.length < 4) {
      return true;
    }
    return false;
  };
  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered');
    } else {
      throw err;
    }
  };
  const loadJson = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        // type: DocumentPicker.types.plainText,
      });
      pickerResult.uri;
      const res = await RNFS.readFile(pickerResult.fileCopyUri);
      walletJsonChange(res);
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.flex}>
        <ImageOverlay style={GlobalStyles.container} source={require('../../assets/images/background.png')}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={GlobalStyles.container}>
              <View>
                <Input style={GlobalStyles.input} onChangeText={setName} value={name} placeholder="Wallet name, min 5 chars" disabled={loading} />
                <Input style={GlobalStyles.input} onChangeText={walletPasswordChange} value={walletPassword} placeholder="Current Wallet Password" disabled={loading} />

                <Input multiline={true} style={GlobalStyles.button} value={walletJson} numberOfLines={14} placeholder="Wallet JSON" disabled={true} />

                {loading ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <View>
                    <View style={GlobalStyles.input}>
                      <Button style={GlobalStyles.input} onPress={async () => await loadJson()}>
                        Load JSON
                      </Button>
                    </View>
                    <Button disabled={loading || invalid()} onPress={async () => await OnImportPress()}>
                      IMPORT
                    </Button>
                  </View>
                )}
              </View>
            </View>
          )}
        </ImageOverlay>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
