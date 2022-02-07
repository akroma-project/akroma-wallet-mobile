import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

import { HomeStackNavigator } from './HomeStackNavigator';
import { CreateStackNavigator } from './CreateStackNavigator';
import { HomeIcon, SettingsIcon } from '../components/AppIcons';
import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsContext } from '../providers/SettingsProvider';
import { CreateWalletScreen } from '../screens/onboarding/CreateWalletScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { ImportWalletTabNav } from '../screens/onboarding/ImportWalletScreen';

export type OnboardingStackParamList = {
  OnboardingScreen: undefined;
  CreateWalletScreen: undefined;
  ImportWalletScreen: undefined;
  WatchWalletScreen: undefined;
  ImportWalletTabNav: undefined;
};

const ApplicationTable = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="Settings" icon={SettingsIcon} />
  </BottomNavigation>
);

const OnboardingStack = createStackNavigator<OnboardingStackParamList>();

export const ApplicationNavigation = () => {
  const { state, init } = useContext(SettingsContext);

  React.useEffect(() => {
    setTimeout(() => {
      init();
    }, 2000);
  }, [init]);

  if (state.onboardComplete) {
    return (
      <NavigationContainer>
        <ApplicationTable.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />}>
          <ApplicationTable.Screen name="Home" component={HomeStackNavigator} />
          <ApplicationTable.Screen name="Settings" component={CreateStackNavigator} />
        </ApplicationTable.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
        <OnboardingStack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ title: '' }} />
        <OnboardingStack.Screen name="CreateWalletScreen" component={CreateWalletScreen} options={{ title: '' }} />
        <OnboardingStack.Screen name="ImportWalletTabNav" component={ImportWalletTabNav} options={{ title: '' }} />
      </OnboardingStack.Navigator>
    </NavigationContainer>
  );
};
