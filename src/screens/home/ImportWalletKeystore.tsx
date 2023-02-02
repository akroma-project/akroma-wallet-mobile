import * as React from 'react';
import { ActivityIndicator, Keyboard, Platform, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useState } from 'react';
import { Input, Button } from '@ui-kitten/components';
import { useDatabaseConnection } from '../../data/connection';
import { AkromaRn } from '@akroma-project/akroma-react-native';
import { ImageOverlay } from '../../extra/image-overlay.component';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';
import { checkPermission } from '../../utils/Permissions';
import { WalletContext } from '../../providers/WalletProvider';
import Toast from 'react-native-toast-message';
import CloudSvg from '../../assets/svg/Cloud';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RedCrossSvg from '../../assets/svg/RedCrossSvg';

const akromaRn = new AkromaRn();
const permissionsRequiered = [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];

export const ImportWalletKeystore = () => {
  const { addWallet, refreshWallets, loadWallets } = React.useContext(WalletContext);

  const { walletsRepository } = useDatabaseConnection();
  const [walletJson, walletJsonChange] = useState('');
  const [walletPassword, walletPasswordChange] = useState('');
  const [fileName, setFileName] = useState('');
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
    if (fileName) {
      setFileName('');
      return;
    }
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        // type: DocumentPicker.types.plainText,
      });
      pickerResult.uri;
      setFileName(pickerResult.name);
      const res = await RNFS.readFile(pickerResult.fileCopyUri);
      walletJsonChange(res);
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.flex}>
        <ImageOverlay style={[GlobalStyles.container, GlobalStyles.pt100]} source={require('../../assets/images/background.png')}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={GlobalStyles.container}>
              <View>
                <View style={GlobalStyles.input}>
                  <Input style={[GlobalStyles.mb5]} onChangeText={setName} value={name} placeholder="Wallet name" disabled={loading} />
                  <Text style={[GlobalStyles.smallTextWhite, GlobalStyles.mb15]}>Must contain at least 5 characters</Text>
                </View>
                <View style={GlobalStyles.input}>
                  <Input style={GlobalStyles.mb5} onChangeText={walletPasswordChange} value={walletPassword} placeholder="Current Wallet Password" disabled={loading} />
                  <Text style={[GlobalStyles.smallTextWhite, GlobalStyles.mb15]}>Must contain at least 4 numbers</Text>
                </View>

                {loading ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <View>
                    <View style={[GlobalStyles.input, GlobalStyles.mb30]}>
                      <TouchableOpacity style={GlobalStyles.akromaWhiteButton} onPress={async () => await loadJson()}>
                        <View style={[GlobalStyles.ml20, GlobalStyles.akromaButtonIcon]}>{fileName ? <RedCrossSvg /> : <CloudSvg />}</View>
                        <View style={fileName ? GlobalStyles.grayTextAkromaButtonContainerSelected : GlobalStyles.grayTextAkromaButtonContainer}>
                          {fileName ? <Text style={GlobalStyles.grayTextAkromaButtonSelected}>{fileName}</Text> : <Text style={GlobalStyles.grayTextAkromaButton}>Load JSON</Text>}
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Button style={loading || invalid() ? GlobalStyles.akromaRedButtonDisabled : GlobalStyles.akromaRedButton} disabled={loading || invalid()} onPress={async () => await OnImportPress()}>
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
