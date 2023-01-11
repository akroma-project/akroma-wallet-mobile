import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Connection, createConnection } from 'typeorm';

import { WalletModel } from './entities/wallet';
import { WalletsRepository } from './repositories/walletsRepository';

interface DatabaseConnectionContextData {
  walletsRepository: WalletsRepository;
  isConnected: boolean | null;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>({} as DatabaseConnectionContextData);

export const DatabaseConnectionProvider = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    console.debug('Connecting to database');
    const createdConnection = await createConnection({
      type: 'react-native',
      database: 'akroma6.db',
      location: 'default',
      entities: [WalletModel],
      synchronize: true,
      logging: true,
    });
    setConnection(createdConnection);
  }, []);

  if (!connection) {
    (async () => await connect())();
  }

  const value = useMemo(
    () => ({
      walletsRepository: new WalletsRepository(connection),
      isConnected: connection?.isConnected,
    }),
    [connection],
  );
  console.log('value: ', value);
  return <DatabaseConnectionContext.Provider value={value}>{children}</DatabaseConnectionContext.Provider>;
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);
  return context;
}
