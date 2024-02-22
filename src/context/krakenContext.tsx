import * as React from "react";
import { TradeRaw } from "../types/trade";
import { OrderTransactionSummarized } from "../types/orderTransactions";
import { OrganizedWallet } from "../types/organizedWallet";

export type KrakenView = "TRANSACTIONS_LIST" | "WALLET" | "MONTH_VIEW";

type KrakenData = {
  parsedData: TradeRaw[];
  setParsedData: (p: TradeRaw[]) => void;
  sumTransactions: OrderTransactionSummarized[];
  setSumTransactions: (t: OrderTransactionSummarized[]) => void;
  columns: string[];
  setColumns: (s: string[]) => void;
  wallet: OrganizedWallet;
  setWallet: (w: OrganizedWallet) => void;
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
  wallet: {},
  setWallet: () => null,
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
  const [wallet, setWallet] = React.useState<OrganizedWallet>({});

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
        wallet,
        setWallet,
      }}
    >
      {children}
    </KrakenContext.Provider>
  );
};
