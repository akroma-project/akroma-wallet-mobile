import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '@ui-kitten/components';
import AkaIcon from '../assets/svg/AkaIconSvg';

interface Params {
  balance: Number;
}

export const HomeResumeAmount = (params: Params) => {
  const localStringOptions = {
    maximumFractionDigits: 12,
    minimumFractionDigits: 2,
  };

  return (
    <LinearGradient colors={['#A60000', '#F20000']} style={styles.resumeContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} locations={[0.0588, 0.9449]}>
      <AkaIcon style={styles.icon} />
      <View>
        <Text style={styles.title}>AKA Balance</Text>
        <Text style={styles.textAmount}>{params.balance?.toLocaleString('en-US', localStringOptions)}</Text>
        <Text style={styles.label}>$ 15.04</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 32,
    position: 'absolute',
    top: -15,
  },
  resumeContainer: {
    marginTop: 40,
    borderRadius: 24,
    minWidth: 344,
    minHeight: 125,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
});
