import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateWalletScreen } from '../screens/CreateWalletScreen';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components/ui';
import GlobalStyles from '../constants/GlobalStyles';

export type CreateStackParamList = {
  CreateWalletScreen: undefined;
};

const CreateStack = createStackNavigator<CreateStackParamList>();

export function CreateStackNavigator() {
  return (
    <CreateStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: GlobalStyles.header,
        headerRight: (style: any) => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu-2-outline" {...style} style={GlobalStyles.iconRight} fill="#000000" />
          </TouchableOpacity>
        ),
        title: '',
      })}>
      <CreateStack.Screen name="CreateWalletScreen" component={CreateWalletScreen} options={{ title: 'Create' }} />
    </CreateStack.Navigator>
  );
}
