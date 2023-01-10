import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Avatar, Layout } from '@ui-kitten/components';
import { getBlockByNumber } from '../../services/AkromaApi';

interface Block {
  number: string;
  hash: string;
  timestamp: number;
  parentHash: string;
  sha3Uncles: string;
  miner: string;
  difficulty: string;
  gasLimit: string;
  gasUsed: string;
  nonce: string;
  extraData: string;
}
export const BlockDetails = ({ route }) => {
  const { blockNumber } = route.params;
  const [block, setBlock] = useState<Block>();
  useEffect(() => {
    getBlockByNumber(blockNumber).then(res => setBlock(res));
  }, [blockNumber]);
  return (
    <View style={styles.container}>
      <Layout style={styles.avatarContainer}>
        <Avatar size="giant" source={require('../../assets/images/icon.png')} />
      </Layout>
      {block ? (
        <Layout>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>Number:</Text> {block.number}
          </Text>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>Hash:</Text> {block.hash}
          </Text>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>Timestamp:</Text> {new Date(block.timestamp * 1000).toISOString()}
          </Text>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>Parent Hash:</Text> {block.parentHash}
          </Text>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>SHA3 Uncles:</Text> {block.sha3Uncles}
          </Text>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>Miner:</Text> {block.miner}
          </Text>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>Difficulty:</Text> {block.difficulty}
          </Text>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>Total Difficulty:</Text> {block.gasLimit}
          </Text>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>Gas Used:</Text> {block.gasUsed}
          </Text>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>Nonce:</Text> {block.nonce}
          </Text>
          <Text style={styles.pt5}>
            <Text style={styles.bold}>Extra Data:</Text> {block.extraData}
          </Text>
        </Layout>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  avatarContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  pt5: {
    paddingTop: 5,
  },
});
