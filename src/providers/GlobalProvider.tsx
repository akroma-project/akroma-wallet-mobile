import React, { createContext, useState } from 'react';

type Props = {
  displayExport: boolean;
  setDisplayExport: React.Dispatch<React.SetStateAction<boolean>>;
  newWatchWallet: string;
  setNewWatchWallet: React.Dispatch<React.SetStateAction<string>>;
  mainHeaderHeight: number;
  setMainHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
  balanceHeaderHeight: number;
  setBalanceHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
  sendButtonsHeight: number;
  setSendButtonsHeight: React.Dispatch<React.SetStateAction<number>>;
};

const GlobalContext = createContext<Props>({} as Props);

interface serverProviderProps {
  children: React.ReactNode | any;
}

const GlobalProvider = (props: serverProviderProps) => {
  const [displayExport, setDisplayExport] = useState(false);
  const [newWatchWallet, setNewWatchWallet] = useState('');
  const [mainHeaderHeight, setMainHeaderHeight] = useState(0);
  const [balanceHeaderHeight, setBalanceHeaderHeight] = useState(0);
  const [sendButtonsHeight, setSendButtonsHeight] = useState(0);
  const initialValue = {
    displayExport,
    setDisplayExport,
    newWatchWallet,
    setNewWatchWallet,
    mainHeaderHeight,
    setMainHeaderHeight,
    balanceHeaderHeight,
    setBalanceHeaderHeight,
    sendButtonsHeight,
    setSendButtonsHeight,
  };

  return <GlobalContext.Provider value={initialValue}>{props.children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };
