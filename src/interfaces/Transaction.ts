export interface Transaction {
  blockHash: string;
  blockNumber: number;
  contractAddress?: any;
  cumulativeGasUsed: number;
  effectiveGasPrice: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  id: number;
  input: string;
  logsBloom: string;
  nonce: number;
  status: boolean;
  to: string;
  transactionIndex: number;
  ts: number;
  value: string;
}
