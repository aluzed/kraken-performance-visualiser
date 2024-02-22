import * as React from "react";
import { TradeRaw } from "../types/trade";
import { OrderTransactionSummarized } from "../types/orderTransactions";

export type KrakenView =
  | "TRANSACTIONS_LIST"
  | "TRANSACTION_PER_PAIR"
  | "MONTH_VIEW";

type KrakenData = {
  parsedData: TradeRaw[];
  setParsedData: (p: TradeRaw[]) => void;
  sumTransactions: OrderTransactionSummarized[];
  setSumTransactions: (t: OrderTransactionSummarized[]) => void;
  columns: string[];
  setColumns: (s: string[]) => void;
  viewName: KrakenView;
  setViewName: (v: KrakenView) => void;
};

export const KrakenContext = React.createContext<KrakenData>({
  parsedData: [],
  setParsedData: () => null,
  sumTransactions: [],
  setSumTransactions: () => null,
  columns: [],
  setColumns: () => null,
  viewName: "TRANSACTIONS_LIST",
  setViewName: () => null,
});

export const KrakenProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [parsedData, setParsedData] = React.useState<TradeRaw[]>([]);
  const [sumTransactions, setSumTransactions] = React.useState<
    OrderTransactionSummarized[]
  >([]);
  const [columns, setColumns] = React.useState<string[]>([]);
  const [viewName, setViewName] =
    React.useState<KrakenView>("TRANSACTIONS_LIST");

  return (
    <KrakenContext.Provider
      value={{
        parsedData,
        setParsedData,
        sumTransactions,
        setSumTransactions,
        columns,
        setColumns,
        viewName,
        setViewName,
      }}
    >
      {children}
    </KrakenContext.Provider>
  );
};
