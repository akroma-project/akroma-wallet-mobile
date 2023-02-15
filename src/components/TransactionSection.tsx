import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, FlatList, Dimensions } from 'react-native';

import { getTransactionsByAddress } from '../services/AkromaApi';
import { TransactionCard } from './TransactionCard';
import { Utils } from 'typesafe-web3/dist/lib/utils';
import { WalletContext } from '../providers/WalletProvider';
import { Divider } from '@ui-kitten/components';

import { TransactionSectionTop } from './TransactionSectionTop';
import { DymanicStyles } from '../constants/GlobalStyles';

export const TransactionSection = ({ setDisplayButtons }) => {
  const { state } = React.useContext(WalletContext);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const listRef = useRef(null);
  const utils = new Utils();
  const sumAddress = utils.toChecksumAddress(state.wallet.address);
  const [viewHeight, setViewHeight] = useState(Dimensions.get('screen').height);

  Dimensions.addEventListener('change', () => {
    setViewHeight(Dimensions.get('screen').height);
  });

  useEffect(() => {
    getTransactionsByAddress(sumAddress, page - 1).then(json => {
      setTransactions(transactions.concat(json));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const loadMoreTransactions = () => {
    setPage(page + 1);
  };
  const hanldeDisplayButtons = event => {
    let currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > 200) {
      setDisplayButtons('none');
    } else {
      setDisplayButtons('flex');
    }
  };
  const isWatchWallet = state.wallet.encrypted === 'watch';
  return (
    <SafeAreaView style={!isWatchWallet ? [] : [DymanicStyles({ viewHeight }).walletsContainer]}>
      {!isWatchWallet ? <></> : <TransactionSectionTop />}
      {transactions.length > 0 && (
        <FlatList
          ref={listRef}
          data={transactions}
          renderItem={({ item }) => <TransactionCard id={item.id} addressFrom={item.from} amount={item.value * 0.000000000000000001} addressTo={item.to} sent={item.from === sumAddress} />}
          onEndReached={loadMoreTransactions}
          ItemSeparatorComponent={() => <Divider />}
          onScroll={hanldeDisplayButtons}
        />
      )}
    </SafeAreaView>
  );
};
