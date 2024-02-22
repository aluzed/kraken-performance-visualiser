import { OrderTransactionSummarized } from "./orderTransactions";

export type OrganizedWallet = Record<
  string,
  {
    amount: number;
    transactions: OrderTransactionSummarized[];
    totalValue: number;
  }
>;
