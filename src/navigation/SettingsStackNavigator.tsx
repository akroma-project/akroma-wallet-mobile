import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components/ui';
import GlobalStyles from '../constants/GlobalStyles';
import SettingsScreen from '../screens/settings/SettingsScreen';

export type SettingsStackParamList = {
  SettingsWalletScreen: undefined;
};

const SettingsStack = createStackNavigator<SettingsStackParamList>();

export function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: (style: any) => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu-2-outline" {...style} style={GlobalStyles.iconRight} fill="#000000" />
          </TouchableOpacity>
        ),
        title: '',
      })}>
      <SettingsStack.Screen name="SettingsWalletScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
    </SettingsStack.Navigator>
  );
}
