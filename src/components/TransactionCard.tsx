import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Avatar, Layout } from '@ui-kitten/components';
export const SimpleCard = ({ addressFrom, addressTo, status, amount }) => {
  const color = () => {
    if (status === 'Sending') {
      return 'blue';
    } else if (status === 'Complete') {
      return 'green';
    } else {
      return 'red';
    }
  };
  return (
    <View>
      <Layout style={bannerStyle(color()).bannerContainer}>
        <Text style={styles.banner}>{status}</Text>
      </Layout>
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
          <Text style={styles.textBold}>{amount} AKA</Text>
        </Layout>
      </Layout>
    </View>
  );
};

const bannerStyle = (color: string) =>
  StyleSheet.create({
    bannerContainer: {
      top: -10,
      right: 7,
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
  bodyContainer: {
    flex: 7,
    paddingLeft: 10,
  },
  avatarContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    top: -10,
    right: 7,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'baseline',
    alignSelf: 'flex-end',
    backgroundColor: 'green',
    borderRadius: 4,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    borderRadius: 10,
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
});
