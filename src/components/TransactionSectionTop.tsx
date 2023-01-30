import React from 'react';
import { Button, Text as KittenText } from '@ui-kitten/components';
import GlobalStyles from '../constants/GlobalStyles';
import { Text, View } from 'react-native';
import ArrowleftSvg from '../assets/svg/ArrowleftSvg';
import MinusSvg from '../assets/svg/MinusSvg';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { useNavigation } from '@react-navigation/core';
import { WalletContext } from '../providers/WalletProvider';
import CalendarSvg from '../assets/svg/CalendarSvg';
import ArrowDownTransparentSvg from '../assets/svg/ArrowDownTransparentSvg';

export const TransactionSectionTop = () => {
  const { cleanWalletActive } = React.useContext(WalletContext);
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const handleBack = () => {
    cleanWalletActive();
    navigator.navigate('HomeScreen');
  };
  return (
    <View style={GlobalStyles.pt8}>
      <View style={GlobalStyles.alingItemsCenter}>
        <MinusSvg />
      </View>
      <View style={[GlobalStyles.displayFlex, GlobalStyles.flexColumn, GlobalStyles.px1]}>
        <View style={[GlobalStyles.flexRow, GlobalStyles.displayFlex, GlobalStyles.justifyBetween]}>
          <View style={[GlobalStyles.alingItemsStart, GlobalStyles.transactionSpacer]}>
            <Button onPress={handleBack} appearance="ghost" accessoryLeft={<ArrowleftSvg />} />
          </View>
          <View>
            <Text style={[GlobalStyles.titleText, GlobalStyles.pt10]}>Transactions</Text>
          </View>
          <View style={GlobalStyles.transactionSpacer} />
        </View>
        <View style={[GlobalStyles.displayFlex, GlobalStyles.justifyCenter, GlobalStyles.alignCenter, GlobalStyles.fullWidth]}>
          <Button onPress={handleBack} appearance="ghost" accessoryLeft={<CalendarSvg />} accessoryRight={<ArrowDownTransparentSvg />}>
            {evaProps => (
              <Text {...evaProps} style={{ ...GlobalStyles.smallText, ...GlobalStyles.px1 }}>
                Jan 2023
              </Text>
            )}
          </Button>
        </View>
      </View>
    </View>
  );
};
