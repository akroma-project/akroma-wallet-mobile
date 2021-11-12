import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { WalletContext } from '../../providers/WalletProvider';
import QRCode from 'react-native-qrcode-svg';
import { Button } from '@ui-kitten/components/ui';
import { ShareIcon } from '../../components/AppIcons';

export const ReceiveCoinScreen = () => {
  const { state } = React.useContext(WalletContext);
  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={GlobalStyles.centerCenter}>
        <View>
          <View key="qr" style={{ marginBottom: 20 }}>
            <QRCode value={state.wallet?.address} size={300} />
          </View>
          <Button accessoryRight={ShareIcon} style={GlobalStyles.button}>
            SHARE
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
