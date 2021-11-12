import * as React from 'react';
import { View } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';

export default function SettingsScreen() {
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.separator} />
      {/* <Button
        disabled={loading}
        onPress={async () => await dispatch('reset-wallets')}
      >RESET WALLETS</Button> */}
    </View>
  );
}
