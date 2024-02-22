import { OrderTransactionSummarized } from "./orderTransactions";

export type OrganizedWallet = Record<
  string,
  {
    amount: number;
    transactions: OrderTransactionSummarized[];
    totalPrice: Record<string, number>;
  }
>;
