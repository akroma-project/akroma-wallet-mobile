import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Connection, createConnection } from 'typeorm';

import { WalletModel } from './entities/wallet';
import { WalletsRepository } from './repositories/walletsRepository';

interface DatabaseConnectionContextData {
  walletsRepository: WalletsRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>({} as DatabaseConnectionContextData);

export const DatabaseConnectionProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
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

  useEffect(() => {
    if (connection === null) {
      setTimeout(() => connect(), 1000);
    }
  }, [connect, connection]);

  return (
    <DatabaseConnectionContext.Provider
      value={{
        walletsRepository: new WalletsRepository(connection),
      }}>
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);
  return context;
}
