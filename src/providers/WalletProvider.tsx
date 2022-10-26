import React, { createContext, useState } from 'react';
import { WalletModel } from '../data/entities/wallet';
import { TypeSafeWeb3 } from 'typesafe-web3';
import { Utils } from 'typesafe-web3/dist/lib/utils';
import { AkromaRn, EthUnits } from 'akroma-react-native';
import { useDatabaseConnection } from '../data/connection';

type Props = {
  state: WalletState;
  loadWallets: () => Promise<void>;
  addWallet: (wallet: WalletModel) => void;
  removeWallet: (wallet: WalletModel) => void;
  updateBalance: (id: string) => Promise<WalletModel>;
  setWallets: (wallets: WalletModel[]) => void;
  setActive: (id: string) => void;
  send: (to: string, value: string) => Promise<string>;
};

const WalletContext = createContext<Props>({} as Props);

interface serverProviderProps {
  children: React.ReactNode;
}

class WalletState {
  wallet: WalletModel = new WalletModel();
  wallets: WalletModel[] = [];
}

const WalletProvider = (props: serverProviderProps) => {
  const { walletsRepository } = useDatabaseConnection();
  const [state, setState] = useState(new WalletState());
  const address = 'https://boot2.akroma.org';
  const provider = new TypeSafeWeb3(address);
  const utils = new Utils();

  const loadWallets = async () => {
    const wallets = await walletsRepository.getAll();
    console.debug(`wallets:: ${JSON.stringify(wallets)}`);
    setWallets(wallets);
  };

  const addWallet = (wallet: WalletModel) => {
    console.debug('add wallet called');
    setWallets(state.wallets.concat(wallet));
  };

  const removeWallet = (wallet: WalletModel) => {
    console.debug('remove wallet called', wallet.id);
    const wallets = state.wallets.filter(x => x.id !== wallet.id);
    setWallets(wallets);
  };

  const setWallets = (wallets: WalletModel[]) => {
    console.debug('set wallets called', wallets.length);
    setState({ ...state, wallets: wallets });
  };

  const setActive = (id: string): void => {
    console.debug('set active called', id);
    const wallet = state.wallets.find(x => x.id === id);
    if (wallet === undefined) {
      throw 'setActive: could not find wallet';
    }
    setState({ ...state, wallet: wallet, wallets: state.wallets });
  };

  const updateBalance = async (id: string): Promise<WalletModel> => {
    console.debug('update balance called', id);
    const wallet = state.wallets.find(x => x.id === id);
    if (wallet === undefined) {
      throw 'updateBalance: could not find wallet';
    }
    const success = await provider.getBalance(wallet.address);
    let balance = 0;
    if (success.ok) {
      balance = parseInt(utils.fromWei(success.data ?? 0, 'ether').toString(), 10);
    }

    const updated: WalletModel = {
      ...wallet,
      lastBalance: balance,
    };
    const others = state.wallets.filter(x => x.id !== id);
    others.push(updated);
    console.debug('updated list of wallets:', others.length);
    setState({ ...state, wallets: others, wallet: updated });
    return updated;
  };

  const send = async (to: string, value: string): Promise<string> => {
    console.debug('send called');
    // return "none";
    const wallet = state.wallets.find(x => x.id === state.wallet.id);
    if (wallet === undefined) {
      throw 'send: could not find active wallet';
    }
    const akromaRn = new AkromaRn();
    await akromaRn.loadWallet(wallet.encrypted, wallet.pin);
    // wallet must be loaded first
    console.debug('from:', wallet.address, 'to:', to);
    const txid = await akromaRn.sendFunds(wallet.address, wallet.pin, to, parseInt(value, 10), EthUnits.eth);
    console.debug('txid:', txid);
    return txid;
  };

  const initalValue = {
    state,
    loadWallets,
    addWallet: addWallet,
    removeWallet: removeWallet,
    updateBalance: updateBalance,
    setActive: setActive,
    setWallets: setWallets,
    send: send,
  };

  return <WalletContext.Provider value={initalValue}>{props.children}</WalletContext.Provider>;
};

export { WalletContext, WalletProvider };
