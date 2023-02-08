import { Divider } from '@ui-kitten/components';
import GlobalStyles, { DymanicStyles } from '../constants/GlobalStyles';
import React, { useEffect, useRef, useState } from 'react';
import { WalletModel } from '../data/entities/wallet';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { WalletCard } from './WalletCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WalletContext } from '../providers/WalletProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { useNavigation } from '@react-navigation/core';
import { SwipeListView } from 'react-native-swipe-list-view';
import Trash from '../assets/svg/Trash';
import ConfirmationModal from './ConfirmationModal';
import { ModalProp } from '../interfaces/ModalProp';

interface Props {
  wallets: WalletModel[];
}
interface WalletsSectionParams {
  title: string;
  wallets: WalletModel[];
  style?: any;
  openModal: () => void;
}
const WalletsSection = ({ title, wallets, style, openModal }: WalletsSectionParams) => {
  const { setActive, updateBalance, removeWallet } = React.useContext(WalletContext);
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

  const navigator = useNavigation<homeScreenProp>();
  const handleSelect = (id: string) => {
    updateBalance(id);
    setActive(id);
    navigator.navigate('TransactionScreen');
  };

  const closeRow = (rowMap, rowKey) => {
    const row = rowMap[rowKey.key];
    if (row) {
      row.closeRow();
    }
  };

  const confirmationModal = (rowMap, wallet: WalletModel) => {
    setActive(wallet.id);
    closeRow(rowMap, wallet);
    openModal();
  };

  const VisibleItem = props => {
    const { rowHeightAnimatedValue, rightActionState, data, removeRow } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View>
        <TouchableHighlight underlayColor="#DDDDDD" key={data.item.id} onPress={() => handleSelect(data.item.id)}>
          <View style={styles.rowFront}>
            <WalletCard wallet={data.item} />
            <Divider />
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(50);
    return <VisibleItem rowHeightAnimatedValue={rowHeightAnimatedValue} data={data} removeRow={() => confirmationModal(rowMap, data.item)} />;
  };

  const HiddenItemWithActions = props => {
    const { leftActionActivated, rightActionActivated, rowActionAnimatedValue, rowHeightAnimatedValue, data, rowMap } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }, leftActionActivated]}>
        {!leftActionActivated && (
          <Animated.View style={[styles.backRightBtn, styles.backRightBtnRight]}>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => confirmationModal(rowMap, data.item)}>
              <Trash />
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(50);
    return <HiddenItemWithActions data={data} rowMap={rowMap} rowActionAnimatedValue={rowActionAnimatedValue} rowHeightAnimatedValue={rowHeightAnimatedValue} onClose={() => closeRow(rowMap, data)} />;
  };

  const ListOrMessage = wallets?.length ? (
    <SwipeListView
      data={wallets}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-100}
      leftActivationValue={100}
      rightActivationValue={-100}
      leftActionValue={0}
      rightActionValue={-500}
      disableRightSwipe
    />
  ) : null;

  return (
    <View style={style}>
      <Text style={styles.subTitle}>{title}</Text>
      {ListOrMessage}
      {title === 'Watched Wallets' && wallets?.length === 0 && <Text style={styles.noWatched}>There are no wallets being watched</Text>}
    </View>
  );
};

export const TopWallets = ({ wallets }: Props) => {
  const [walletsState, setWalletsState] = useState<WalletModel[]>([]);
  const [watchWallets, setWatchWallets] = useState<WalletModel[]>([]);
  const modalRef = useRef<ModalProp>();

  const [viewHeight, setViewHeight] = useState(Dimensions.get('screen').height);

  useEffect(() => {
    const removeWatchedWallets = wallets.filter(element => element.encrypted !== 'watch');
    const orderWallets = removeWatchedWallets.sort((a, b) => Number(b.lastBalance) - Number(a.lastBalance));
    setWalletsState(orderWallets);
    const tempWatchwallet = wallets.filter(element => element.encrypted === 'watch');
    setWatchWallets(tempWatchwallet);
  }, [wallets]);

  Dimensions.addEventListener('change', () => {
    setViewHeight(Dimensions.get('screen').height);
  });

  const openModal = () => modalRef.current.openModal();

  return (
    <View style={[DymanicStyles({ viewHeight }).walletsContainer]}>
      <Text style={[GlobalStyles.titleText, GlobalStyles.pv24]}>Wallets</Text>
      <SafeAreaView>
        <WalletsSection openModal={openModal} title={'My Wallets'} wallets={walletsState} />
        <WalletsSection openModal={openModal} title={'Watched Wallets'} wallets={watchWallets} style={styles.walletsSection} />
        <ConfirmationModal ref={modalRef} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  walletsSection: {
    paddingTop: 30,
  },
  subTitle: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  container: {
    height: '29%',
    backgroundColor: '#DB0000',
  },
  rowFront: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DB0000',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#DB0000',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  noWatched: {
    color: 'black',
    paddingTop: 40,
    textAlign: 'center',
  },
});
