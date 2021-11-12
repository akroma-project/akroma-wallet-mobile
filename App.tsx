import React from 'react';
import 'core-js/proposals/reflect-metadata';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Navigation from './src/navigation/Navigation';
import { WalletProvider } from './src/providers/WalletProvider';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { DatabaseConnectionProvider } from './src/data/connection';

export default function App() {
  return (
    <DatabaseConnectionProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <WalletProvider>
          <Navigation />
        </WalletProvider>
      </ApplicationProvider>
    </DatabaseConnectionProvider>
  );
}
