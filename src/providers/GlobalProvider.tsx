import React, { createContext, useState } from 'react';

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
