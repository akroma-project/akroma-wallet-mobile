import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Avatar, Layout, Card } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { WalletsStackParamList } from '../navigation/WalletsStackNavigator';
interface Props {
  addressFrom: string;
  addressTo: string;
  status: string;
  amount: string;
  blockNumber?: string;
  sent?: boolean;
}
const bannerColor = (status: string) => {
  if (status === 'In Progress') {
    return 'blue';
  } else if (status === 'Successful') {
    return 'green';
  } else {
    return 'red';
  }
};

export const TransactionCard = (props: Props) => {
  const { addressFrom, addressTo, status, amount, blockNumber, sent } = props;
  type walletScreenProp = StackNavigationProp<WalletsStackParamList, 'BlockNumber'>;
  const navigator = useNavigation<walletScreenProp>();
  const goDetailts = (block: string) => {
    if (block) {
      navigator.navigate('BlockNumber', {
        blockNumber: block,
      });
    }
  };
  return (
    <View>
      <Layout style={bannerStyle(bannerColor(status)).bannerContainer}>
        <Text style={styles.banner}>{status}</Text>
      </Layout>
      <Card onPress={() => goDetailts(blockNumber)} style={styles.card}>
        <Layout style={styles.container} level="1">
          <Layout style={styles.avatarContainer}>
            <Avatar source={require('../assets/images/icon.png')} />
          </Layout>

          <Layout style={styles.bodyContainer}>
            <Text style={styles.textAddress}>
              <Text style={styles.textBold}>From: </Text>
              {addressFrom}
            </Text>
            <Text style={styles.textAddress}>
              <Text style={styles.textBold}>To: </Text>
              {addressTo}
            </Text>
            {blockNumber && (
              <Text style={styles.textAddress}>
                <Text style={styles.textBold}>#Block: </Text>
                {blockNumber}
              </Text>
            )}
            <Text style={[sent ? styles.sent : styles.received, styles.textBold]}>
              {sent ? '-' : '+'} {amount} AKA
            </Text>
          </Layout>
        </Layout>
      </Card>
    </View>
  );
};

const bannerStyle = (color: string) =>
  StyleSheet.create({
    bannerContainer: {
      top: -10,
      right: 15,
      position: 'absolute',
      zIndex: 2,
      alignItems: 'baseline',
      alignSelf: 'flex-end',
      backgroundColor: color,
      borderRadius: 4,
      marginBottom: 8,
    },
  });
const styles = StyleSheet.create({
  sent: {
    color: 'red',
  },
  received: {
    color: 'green',
  },
  bodyContainer: {
    flex: 7,
    paddingLeft: 10,
  },
  avatarContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textAddress: {
    fontSize: 12,
  },
  banner: {
    fontSize: 10,
    textAlign: 'center',
    padding: 3,
    color: 'white',
    fontWeight: 'bold',
    minWidth: 100,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    borderRadius: 20,
  },
});
