import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { TransactionCard } from '../../components/TransactionCard';
import { WalletContext } from '../../providers/WalletProvider';
import GlobalStyles from '../../constants/GlobalStyles';
import { Pagination } from '../../components/Pagination';
import { getTransactionsByAddress } from '../../services/AkromaApi';
import { Utils } from 'typesafe-web3/dist/lib/utils';

const screenHeight = Dimensions.get('window').height;
export const WalletTransactionHistory = () => {
  const { getTransactionCountByAddress, state } = React.useContext(WalletContext);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const listRef = useRef(null);
  const handlePage = (newValue: number) => {
    listRef.current.scrollTo({ y: 0, animated: true });
    setPage(newValue);
  };
  const utils = new Utils();

  const sumAddress = utils.toChecksumAddress(state.wallet.address);
  useEffect(() => {
    const loadPages = async () => {
      const total = await getTransactionCountByAddress(sumAddress);
      setTotalPage(Math.ceil(total / 10));
    };
    loadPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getTransactionsByAddress(sumAddress, page - 1).then(json => {
      setTransactions(json);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <View>
      <ScrollView style={[GlobalStyles.mt20, styles.walletsList]} ref={listRef}>
        {transactions?.map?.(({ from, to, blockNumber, value, status }) => (
          <View style={(GlobalStyles.mt20, GlobalStyles.p10)} key={blockNumber}>
            <TransactionCard addressFrom={from} amount={String(value * 0.000000000000000001)} addressTo={to} status={status ? 'Successful' : 'In Progress'} blockNumber={blockNumber} sent={from === sumAddress} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        <Pagination currentPage={page} totalPages={totalPage} onPress={handlePage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  walletsList: {
    maxHeight: screenHeight - 206,
    minHeight: screenHeight - 206,
  },
  paginationContainer: {
    alignSelf: 'stretch',
  },
});
