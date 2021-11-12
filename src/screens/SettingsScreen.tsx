import * as React from 'react';
import { View, Text } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';

export default function SettingsScreen() {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.cardTitle}>Settings</Text>
      <View style={GlobalStyles.separator} />
      {/* <Button
        disabled={loading}
        onPress={async () => await dispatch('reset-wallets')}
      >RESET WALLETS</Button> */}
    </View>
  );
}
