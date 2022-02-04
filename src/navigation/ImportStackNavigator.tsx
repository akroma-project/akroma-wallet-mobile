import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components/ui';
import GlobalStyles from '../constants/GlobalStyles';
import { ImportWalletScreen } from '../screens/onboarding/ImportWalletScreen';

export type ImportStackParamList = {
  ImportWalletScreen: undefined;
};

const ImportStack = createStackNavigator<ImportStackParamList>();

export function ImportStackNavigator() {
  return (
    <ImportStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: GlobalStyles.header,
        headerRight: (style: any) => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu-2-outline" {...style} style={GlobalStyles.iconRight} fill="#000000" />
          </TouchableOpacity>
        ),
        title: '',
      })}>
      <ImportStack.Screen name="ImportWalletScreen" component={ImportWalletScreen} options={{ title: 'Import' }} />
    </ImportStack.Navigator>
  );
}
