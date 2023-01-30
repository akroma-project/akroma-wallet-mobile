import GlobalStyles from '../constants/GlobalStyles';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, ScrollView, Button } from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';

import { TransactionSectionTop } from './TransactionSectionTop';
import { getTransactionsByAddress } from '../services/AkromaApi';
import { TransactionCard } from './TransactionCard';
import { Utils } from 'typesafe-web3/dist/lib/utils';
import { WalletContext } from '../providers/WalletProvider';
import { Divider } from '@ui-kitten/components';
import { GlobalContext } from '../providers/GlobalProvider';

export const TransactionSection = ({ setDisplayButtons }) => {
  const { state } = React.useContext(WalletContext);
  const { selectedMonthYear, showSelectMonth, setShowSelectMonth } = React.useContext(GlobalContext);

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
  }, [page, selectedMonthYear]);
  const loadMoreTransactions = () => {
    setPage(page + 1);
  };

  // if (showSelectMonth) {
  //   return (

  //   );
  // }

  return (
    <View>
      <View style={[GlobalStyles.walletsContainer]}>
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
      </View>
      <View style={[GlobalStyles.monthSelectorContainer]}>
        <BottomSheet ref={(ref: any) => (panelRef.current = ref)}>
          {onScrollEndDrag => (
            <ScrollView onScrollEndDrag={onScrollEndDrag} style={{ marginVertical: 10 }}>
              <Text style={[GlobalStyles.textBold, GlobalStyles.marginBottom20]}>Select the month you want to visualize</Text>
              <Text style={[GlobalStyles.marginBottom20]}>2023</Text>
              <View style={[GlobalStyles.displayFlex, GlobalStyles.justifyBetween, GlobalStyles.flexRow, GlobalStyles.marginBottom20]}>
                <View style={[GlobalStyles.monthButtonContainer]}>
                  <Button title="January" style={GlobalStyles.monthButton} />
                </View>
              </View>
            </ScrollView>
          )}
        </BottomSheet>
      </View>
    </View>
  );
};
