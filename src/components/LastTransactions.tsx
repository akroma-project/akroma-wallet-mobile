import { Card, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { WalletModel } from '../data/entities/wallet';
import { getTransactionsByAddress } from '../services/AkromaApi';
import { Utils } from 'typesafe-web3/dist/lib/utils';

interface Props {
  wallets: WalletModel[];
}

export const LastTransactions = ({ wallets }: Props) => {
  const [lastTransact, setLastTransact] = useState([]);
  const utils = new Utils();

  const generateLastTransactions = async () => {
    if (wallets.length > 0) {
      setLastTransact([]);
      let transactionsArray = [];
      for (let i = 0; i < wallets.length; i++) {
        let transactions = await getTransactionsByAddress(wallets[i].address, 0);
        transactions = transactions.length > 2 ? transactions.slice(0, 3) : transactions.slice(0, transactions.length);

        if (transactions.length > 0) {
          transactionsArray.push(transactions);
        }
      }
      const recentTransactions = transactionsArray.flat();
      const transactionRemoveDuplicate = [...new Map(recentTransactions.map(v => [v.id, v])).values()];
      const transactionsSorted = transactionRemoveDuplicate.sort((a, b) => Number(b.ts) - Number(a.ts));
      const transactionsSliced = transactionsSorted.slice(0, 3);
      setLastTransact(transactionsSliced);
    }
  };
  useEffect(() => {
    generateLastTransactions();
  }, [wallets]);
  return (
    <Layout>
      <Text style={styles.title}>Last transactions</Text>

      {lastTransact &&
        lastTransact.map((transaction, id) => (
          <Card key={`${transaction.id}${id}`}>
            <Text style={styles.cardText}>From: {transaction.from} </Text>
            <Text style={styles.cardText}>To: {transaction.to} </Text>
            <Text style={styles.cardText}>Value: {parseInt(utils.fromWei(transaction.value ?? 0, 'ether').toString(), 10)} AKA</Text>
          </Card>
        ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cardText: {
    color: 'black',
  },
});
