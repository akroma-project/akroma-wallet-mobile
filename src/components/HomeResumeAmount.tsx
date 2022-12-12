import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WalletContext } from '../providers/WalletProvider';

interface Params {
  balance: Number;
}

export const HomeResumeAmount = (params: Params) => {
  const localStringOptions = {
    maximumFractionDigits: 12,
    minimumFractionDigits: 2,
  };
  console.log(params);
  return (
    <LinearGradient colors={['#fba304', '#e60404', '#af0487']} style={styles.resumeContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
      <Text style={styles.textAmount}>AKA {params.balance?.toLocaleString('en-US', localStringOptions)}</Text>
      <Text style={styles.label}>Current balance</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  resumeContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    width: '80%',
    height: '15%',
    alignContent: 'center',
    display: 'flex',
    alignSelf: 'center',
    marginTop: '-12%',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 13.16,

    elevation: 20,
  },
  textAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
});
