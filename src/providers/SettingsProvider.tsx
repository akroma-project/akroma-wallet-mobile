import React, { createContext, useState } from 'react';

type Props = {
  state: SettingsState;
  setOnboarded: (onboarded: boolean) => void;
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

  const setOnboarded = (onboarded: boolean) => {
    console.debug('set onboarded', onboarded);
    setState({ ...state, onboardComplete: onboarded });
  };

  const initalValue = {
    state,
    setOnboarded,
  };

  return <SettingsContext.Provider value={initalValue}>{props.children}</SettingsContext.Provider>;
};

export { SettingsContext, SettingsProvider };
