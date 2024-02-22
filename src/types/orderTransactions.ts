import { Trade } from "./trade";
import { TradeType } from "./tradeType";

export type OrderTransactions = Record<string, Trade[]>;

export type OrderTransactionSummarized = {
  orderTransaction: string;
  orderType: string;
  startTime: Date;
  endTime: Date;
  price: number;
  totalCost: number;
  totalFee: number;
  totalVolume: number;
  margin: number;
  type: TradeType;
  pair: string;
  transactionCount: number;
};
