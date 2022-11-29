import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { WalletModel } from '../data/entities/wallet';

type Props = {
  displayExport: boolean;
  setDisplayExport: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext<Props>({} as Props);

interface serverProviderProps {
  children: React.ReactNode | any;
}

const GlobalProvider = (props: serverProviderProps) => {
  const [displayExport, setDisplayExport] = useState(false);
  const initialValue = {
    displayExport,
    setDisplayExport,
  };

  return <GlobalContext.Provider value={initialValue}>{props.children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };
