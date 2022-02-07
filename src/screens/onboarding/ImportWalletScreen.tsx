import { Tab, TabBar } from '@ui-kitten/components/ui';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { ImportWalletKeystore } from './ImportWalletKeystore';
import { ImportWalletSeedPhrase } from './ImportWalletSeedPhrase';
import { ImportWalletPrivateKey } from './ImportWalletPrivateKey';

const ImportWalletTabBar = ({ navigation, state }) => {
  const onTabSelect = (index: number): void => {
    navigation.navigate(state.routeNames[index]);
  };

  const renderTab = (route: string): React.ReactElement => <Tab key={route} title={route.toUpperCase()} />;

  return (
    <TabBar selectedIndex={state.index} onSelect={onTabSelect}>
      {state.routeNames.map(renderTab)}
    </TabBar>
  );
};

const ImportWalletTabs = createMaterialTopTabNavigator();

export const ImportWalletTabNav = () => (
  <ImportWalletTabs.Navigator tabBar={props => <ImportWalletTabBar {...props} />}>
    <ImportWalletTabs.Screen name="Keystore" component={ImportWalletKeystore} />
    <ImportWalletTabs.Screen name="Seed Phrase" component={ImportWalletSeedPhrase} />
    <ImportWalletTabs.Screen name="Private Key" component={ImportWalletPrivateKey} />
  </ImportWalletTabs.Navigator>
);
