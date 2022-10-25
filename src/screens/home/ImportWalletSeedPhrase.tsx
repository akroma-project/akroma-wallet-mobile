import * as React from 'react';
import { SafeAreaView } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { Text } from '@ui-kitten/components';
import { ImageOverlay } from '../../extra/image-overlay.component';

export const ImportWalletSeedPhrase = () => {
  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <ImageOverlay style={GlobalStyles.container} source={require('../../assets/images/background.png')}>
        <Text category={'h6'} status={'warning'}>
          Importing from Seed Phrase is not yet implemented.
        </Text>
      </ImageOverlay>
    </SafeAreaView>
  );
};
