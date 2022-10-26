import { Button, Input, Text } from '@ui-kitten/components';
// import { AkromaRn } from 'akroma-react-native/lib';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import GlobalStyles from '../../constants/GlobalStyles';
import { ImageOverlay } from '../../extra/image-overlay.component';
// const akromaRn = new AkromaRn();

export const ImportWalletSeedPhrase = () => {
  const [loading] = useState<boolean>(false);
  const [pk, setPk] = useState<string>('');

  const OnImportPress = async () => {
    Toast.show({
      type: 'error',
      text1: 'This feature is not implmented yet',
      position: 'top',
    });
    return;
    // try {
    //   console.debug('not implemented');
    //   setTimeout(async () => {
    //     // TODO: there is not a validateSeedPhrase method in akroma-react-native
    //     // const valid: Boolean = await akromaRn.validateKeystoreCreds(walletJson, walletPassword);
    //     // if (valid) {
    //     //   console.debug(`wallet opened:: ${wallet}`);
    //     // } else {
    //     //   console.debug('unable to load wallet');
    //     // }
    //   }, 600);
    // } catch (error) {
    //   console.error(error);
    //   console.error('unable to open wallet');
    // } finally {
    //   setLoading(false);
    // }
  };

  const invalid = () => {
    if (pk.length < 5) {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <ImageOverlay style={GlobalStyles.container} source={require('../../assets/images/background.png')}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={GlobalStyles.container}>
            <View>
              <Text style={GlobalStyles.error} category={'h6'} status={'warning'}>
                This feature is not implemented.
              </Text>
              <Input style={GlobalStyles.input} onChangeText={setPk} value={pk} placeholder="Seed Phrase" disabled={loading} />
              <Button disabled={loading || invalid()} onPress={async () => await OnImportPress()}>
                IMPORT
              </Button>
            </View>
          </View>
        )}
      </ImageOverlay>
    </SafeAreaView>
  );
};
