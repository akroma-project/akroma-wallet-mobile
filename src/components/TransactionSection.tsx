import GlobalStyles from '../constants/GlobalStyles';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TransactionSectionTop } from './TransactionSectionTop';

export const TransactionSection = () => {
  return (
    <View style={[GlobalStyles.walletsContainer]}>
      <TransactionSectionTop />
      <SafeAreaView>
        <ScrollView>
          <Text>Transactions list</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  walletsSection: {
    paddingTop: 30,
    textAlign: 'center',
  },
  subTitle: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  container: {
    height: '29%',
    backgroundColor: 'red',
  },
});
