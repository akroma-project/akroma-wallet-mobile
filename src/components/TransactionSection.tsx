import GlobalStyles from '../constants/GlobalStyles';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';

import { TransactionSectionTop } from './TransactionSectionTop';
import { getTransactionsByAddress } from '../services/AkromaApi';
import { TransactionCard } from './TransactionCard';
import { Utils } from 'typesafe-web3/dist/lib/utils';
import { WalletContext } from '../providers/WalletProvider';
import { Divider } from '@ui-kitten/components';

export const TransactionSection = ({ setDisplayButtons }) => {
  const { state } = React.useContext(WalletContext);

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const listRef = useRef(null);
  // const handlePage = (newValue: number) => {
  //   listRef.current.scrollTo({ y: 0, animated: true });
  //   setPage(newValue);
  // };
  const utils = new Utils();
  const sumAddress = utils.toChecksumAddress(state.wallet.address);

  useEffect(() => {
    getTransactionsByAddress(sumAddress, page - 1).then(json => {
      setTransactions(transactions.concat(json));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const loadMoreTransactions = () => {
    setPage(page + 1);
  };

  return (
    <SafeAreaView style={[GlobalStyles.walletsContainer]}>
      <TransactionSectionTop />
      <FlatList
        ref={listRef}
        keyExtractor={({ id }) => id}
        data={transactions}
        renderItem={({ item }) => <TransactionCard addressFrom={item.from} amount={item.value * 0.000000000000000001} addressTo={item.to} sent={item.from === sumAddress} />}
        onEndReached={loadMoreTransactions}
        ItemSeparatorComponent={() => <Divider />}
        onScrollBeginDrag={() => console.log('start')}
        nestedScrollEnabled={true}
        onScroll={event => {
          let currentOffset = event.nativeEvent.contentOffset.y;
          if (currentOffset > 200) {
            setDisplayButtons('none');
          } else {
            setDisplayButtons('flex');
          }
        }}
      />
    </SafeAreaView>
  );
};
