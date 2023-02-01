import React, { createContext, useRef, useState } from 'react';

type Props = {
  displayExport: boolean;
  setDisplayExport: React.Dispatch<React.SetStateAction<boolean>>;
  newWatchWallet: string;
  setNewWatchWallet: React.Dispatch<React.SetStateAction<string>>;
  selectedMonthYear: any;
  setSelectedMonthYear: React.Dispatch<React.SetStateAction<any>>;
  showSelectMonth: boolean;
  setShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext<Props>({} as Props);

interface serverProviderProps {
  children: React.ReactNode | any;
}

const GlobalProvider = (props: serverProviderProps) => {
  const [displayExport, setDisplayExport] = useState(false);
  const [newWatchWallet, setNewWatchWallet] = useState('');
  const date = new Date();
  const [selectedMonthYear, setSelectedMonthYear] = useState({
    month: date.getMonth,
    year: date.getFullYear,
  });
  const [showSelectMonth, setShowSelectMonth] = useState(false);
  const panelRef = useRef(null);
  const initialValue = {
    displayExport,
    setDisplayExport,
    newWatchWallet,
    setNewWatchWallet,
    selectedMonthYear,
    setSelectedMonthYear,
    showSelectMonth,
    setShowSelectMonth,
    panelRef,
  };

  return <GlobalContext.Provider value={initialValue}>{props.children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };
