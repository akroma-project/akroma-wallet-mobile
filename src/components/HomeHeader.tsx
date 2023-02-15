import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import GlobalStyles from '../constants/GlobalStyles';
import { HomeScreenHeaderRight } from './HomeScreenHeaderRight';
import { CopyIcon } from './CopyIcon';
import { getAddressFormat } from '../utils/Wallet';
import { DetailsScreenHeaderRight } from './DetailsScreenHeaderRight';
interface Params {
  address: string;
  name: string;
}

export const HomeHeader = (params: Params) => {
  return (
    <View style={GlobalStyles.headerContainer}>
      <View>
        {params.address && (
          <View>
            <Text style={styles.title}>
              Wallet: <Text style={styles.text}>{params.name}</Text>
            </Text>
            <Text style={styles.title}>
              Address: <Text style={styles.text}>{getAddressFormat(params.address)} </Text>
              <CopyIcon value={params.address} />
            </Text>
          </View>
        )}
      </View>
      <View style={styles.menuIconContainer}>{params?.address ? <DetailsScreenHeaderRight /> : <HomeScreenHeaderRight />}</View>
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
