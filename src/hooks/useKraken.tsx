import React from "react";
import { KrakenContext } from "../context/krakenContext";
import { ParseResult } from "papaparse";
import { TradeRaw } from "../types/trade";
import {
  organizeWallet,
  summarizeOrderTransactions,
  tradesRawToMonthlyTrades,
  tradesRawToOrderTransactions,
} from "../libs/krakenReader";

export default function useKraken() {
  const {
    columns,
    parsedData,
    sumTransactions,
    viewName,
    setColumns,
    setParsedData,
    setSumTransactions,
    setViewName,
    wallet,
    setWallet,
  } = React.useContext(KrakenContext);

  const updateKrakenData = (result: ParseResult<TradeRaw>) => {
    setParsedData(result.data);
    setColumns(result.meta.fields ?? []);
    const orderTransactions = tradesRawToOrderTransactions(result.data);
    const sumOrderTransactions = summarizeOrderTransactions(orderTransactions);
    setSumTransactions(sumOrderTransactions);
    setWallet(organizeWallet(sumOrderTransactions));
    const monthlyTrades = tradesRawToMonthlyTrades(result.data);
    console.log(monthlyTrades);
  };

  const closeKrakenFile = () => {
    setColumns([]);
    setParsedData([]);
    setSumTransactions([]);
    setWallet({});
  };

  return {
    columns,
    parsedData,
    sumTransactions,
    viewName,
    wallet,
    setViewName,
    updateKrakenData,
    closeKrakenFile,
  };
}
