import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { WalletsStackParamList } from '../navigation/WalletsStackNavigator';
import GlobalStyles from '../constants/GlobalStyles';
import { getAddressFormat } from '../utils/Wallet';

interface Props {
  addressFrom: string;
  addressTo: string;
  status?: string;
  amount: number | string;
  blockNumber?: string;
  sent?: boolean;
  id?: string;
}

export const TransactionCard = (props: Props) => {
  const { addressFrom, addressTo, amount, blockNumber, sent, id } = props;
  type walletScreenProp = StackNavigationProp<WalletsStackParamList, 'BlockNumber'>;
  const navigator = useNavigation<walletScreenProp>();
  const goDetailts = (block: string) => {
    if (block) {
      navigator.navigate('BlockNumber', {
        blockNumber: block,
      });
    }
  };
  const sentReceivedLabel = sent ? 'Sent' : 'Received';
  const address = sent ? addressTo : addressFrom;
  const localStringOptions = {
    maximumFractionDigits: 12,
    minimumFractionDigits: 2,
  };
  return (
    <Card style={styles.card} key={id}>
      <TouchableWithoutFeedback onPress={() => goDetailts(blockNumber)}>
        <View style={[GlobalStyles.flexRowBetween]}>
          <View>
            <Text style={[GlobalStyles.generalText, GlobalStyles.textBold]}>{sentReceivedLabel}</Text>
            <Text style={[GlobalStyles.smallText]}>{getAddressFormat(address)}</Text>
          </View>
          <View>
            <Text style={[GlobalStyles.generalText, GlobalStyles.textBold, !sent && GlobalStyles.greenColor]}>
              {sent ? '-' : '+'} {amount.toLocaleString('en-US', localStringOptions)}
            </Text>
            <Text style={GlobalStyles.textRight}>Date</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Card>
  );
};

const styles = StyleSheet.create({
  sent: {
    color: 'red',
  },
  received: {
    color: 'green',
  },
  bodyContainer: {
    flex: 7,
    paddingLeft: 10,
  },
  avatarContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  card: {
    borderRadius: 0,
    borderWidth: 0,
    paddingHorizontal: 0,
    justifyContent: 'center',
    height: 72,
  },
});
