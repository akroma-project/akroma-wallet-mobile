import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import GlobalStyles from '../constants/GlobalStyles';
import { HomeScreenHeaderRight } from './HomeScreenHeaderRight';
import { CopyIcon } from './CopyIcon';
interface Params {
  address: string;
  name: string;
}
const getAddressFormat = (address: string) => {
  const addressLength = address.length;
  return address
    .substring(0, 7)
    .concat('...')
    .concat(address.substring(addressLength - 5, addressLength));
};
export const HomeHeader = (params: Params) => {
  return (
    <View style={GlobalStyles.headerContainer}>
      <View>
        <Text style={styles.title}>
          Wallet: <Text style={styles.text}>{params.name}</Text>
        </Text>
        <Text style={styles.title}>
          Address: <Text style={styles.text}>{getAddressFormat(params.address)} </Text>
          <CopyIcon value={params.address} />
        </Text>
      </View>
      <View style={styles.menuIconContainer}>
        <HomeScreenHeaderRight />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  menuIconContainer: {
    alignSelf: 'center',
  },
  title: {
    color: '#B9B9B9',
    fontWeight: '400',
    fontSize: 14,
  },
  text: {
    color: 'white',
  },
});
