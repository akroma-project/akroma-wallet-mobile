import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Props = {
  state: SettingsState;
  setOnboarded: (onboarded: boolean) => Promise<void>;
  init: () => Promise<void>;
};

const SettingsContext = createContext<Props>({} as Props);

interface serverProviderProps {
  children: React.ReactNode;
}

interface SettingsState {
  onboardComplete: boolean;
}

const SettingsProvider = (props: serverProviderProps) => {
  const [state, setState] = useState({} as SettingsState);

  const init = async () => {
    const value = await AsyncStorage.getItem('@onboardComplete');
    const onboardComplete = value === 'true';
    setState({ ...state, onboardComplete: onboardComplete });
    if (value) {
      return true;
    }
    return false;
  };

  const setOnboarded = async (onboarded: boolean) => {
    await AsyncStorage.setItem('@onboardComplete', onboarded.toString());
    setState({ ...state, onboardComplete: onboarded });
  };

  const initalValue = {
    state,
    setOnboarded,
    init,
  };

  return <SettingsContext.Provider value={initalValue}>{props.children}</SettingsContext.Provider>;
};

export { SettingsContext, SettingsProvider };
