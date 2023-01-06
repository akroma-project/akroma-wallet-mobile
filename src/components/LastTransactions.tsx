import { Card, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WalletModel } from '../data/entities/wallet';
import GlobalStyles from '../constants/GlobalStyles';
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
      const transactionsSliced = transactionsSorted.length > 2 ? transactionsSorted.slice(0, 3) : transactionsSorted.slice(0, transactionsSorted.length);
      setLastTransact(transactionsSliced);
    }
  };
  useEffect(() => {
    generateLastTransactions();
  }, [wallets]);
  return (
    <Layout style={styles.bgContainer}>
      <Text style={styles.title}>Last transactions</Text>

      {lastTransact &&
        lastTransact.map((transaction, id) => (
          <Card key={`${transaction.id}${id}`} style={styles.card}>
            <View>
              <Text style={styles.fieldText}>From: </Text>
              <Text style={styles.walletText}>{transaction.from} </Text>
            </View>
            <View style={GlobalStyles.flexRow}>
              <Text style={styles.fieldText}>To: </Text>
              <Text style={styles.walletText}>{transaction.to} </Text>
            </View>

            <View style={styles.dateContainer}>
              <View style={GlobalStyles.flexRow}>
                <Text style={styles.fieldText}>Value: </Text>
                <Text style={styles.numericStyle}>{parseInt(utils.fromWei(transaction.value ?? 0, 'ether').toString(), 10)} AKA</Text>
              </View>

              <Text style={styles.numericStyle}>
                {new Date(transaction.ts * 1000).toLocaleTimeString()} {new Date(transaction.ts * 1000).toLocaleDateString()}
              </Text>
            </View>
          </Card>
        ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 22,
    paddingHorizontal: 20,
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#b0b0b0',
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  numericStyle: { fontSize: 15, color: 'purple' },
  walletText: { fontSize: 13 },
  dateContainer: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
