import React from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['EventEmitter.removeListener']);
import 'core-js/proposals/reflect-metadata';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationNavigation } from './src/navigation/ApplicationNavigation';
import { WalletProvider } from './src/providers/WalletProvider';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { DatabaseConnectionProvider } from './src/data/connection';
import Toast from 'react-native-toast-message';
import { AkromaTheme } from './src/custom-theme';
import { SettingsProvider } from './src/providers/SettingsProvider';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';

const App = () => {
  return (
    <DatabaseConnectionProvider>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...AkromaTheme }}>
        <IconRegistry icons={EvaIconsPack} />
        <ActionSheetProvider>
          <WalletProvider>
            <SettingsProvider>
              <ApplicationNavigation />
              <Toast />
            </SettingsProvider>
          </WalletProvider>
        </ActionSheetProvider>
      </ApplicationProvider>
    </DatabaseConnectionProvider>
  );
};

const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;
