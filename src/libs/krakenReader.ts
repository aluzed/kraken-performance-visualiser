import moment from "moment";
import {
  OrderTransactionSummarized,
  OrderTransactions,
} from "../types/orderTransactions";
import { OrganizedWallet } from "../types/organizedWallet";
import { Trade, TradeRaw, serializeTrade } from "../types/trade";

export const getCryptoName = (pairName: string) => {
  return pairName.replace(/(EUR|USD|USDT)$/g, "");
};

export const getMoneyName = (pairName: string) => {
  return pairName.match(/(EUR|USD|USDT)$/g)?.[0] ?? "";
};

export const tradesRawToOrderTransactions = (
  tradeRawRows: TradeRaw[]
): OrderTransactions => {
  return tradeRawRows.reduce((acc: OrderTransactions, curr: TradeRaw) => {
    if (!acc[curr.ordertxid]) {
      acc[curr.ordertxid] = [];
    }
    acc[curr.ordertxid].push(serializeTrade(curr));
    return acc;
  }, {});
};

export const summarizeOrderTransactions = (
  orderTransactions: OrderTransactions
): OrderTransactionSummarized[] => {
  const sumOrderTransactions: OrderTransactionSummarized[] = [];

  for (const orderTransactionId of Object.keys(orderTransactions)) {
    const oT = orderTransactions[orderTransactionId];

    const { price, type, orderType, pair, margin } = oT?.[0];

    let totalVolume = 0;
    let totalFee = 0;
    let totalCost = 0;

    let startTime = null;
    let endTime = null;

    const transactionCount = oT.length;

    for (const transaction of oT) {
      totalVolume += transaction.volume;
      totalFee += transaction.fee;
      totalCost += transaction.cost;

      if (!startTime) {
        startTime = transaction.time;
      } else if (transaction.time < startTime) {
        startTime = transaction.time;
      }

      if (!endTime) {
        endTime = transaction.time;
      } else if (transaction.time > endTime) {
        endTime = transaction.time;
      }
    }

    sumOrderTransactions.push({
      orderTransaction: orderTransactionId,
      price,
      type,
      orderType,
      pair,
      margin,
      totalCost,
      totalVolume,
      totalFee,
      transactionCount,
      startTime: startTime!,
      endTime: endTime!,
    });
  }

  return sumOrderTransactions;
};

type PairName = {
  coin: string;
  money: string;
};

export const splitPairName = (pairName: string): PairName => {
  return {
    coin: getCryptoName(pairName),
    money: getMoneyName(pairName),
  };
};

export const organizeWallet = (
  sumOrderTransactions: OrderTransactionSummarized[]
): OrganizedWallet => {
  const wallet: OrganizedWallet = {};

  for (let ot of sumOrderTransactions) {
    debugger;
    const { coin, money } = splitPairName(ot.pair);
    if (!wallet[coin]) {
      wallet[coin] = {
        amount: Number(
          ((ot.type === "buy" ? 1 : -1) * ot.totalVolume).toFixed(2)
        ),
        totalPrice: { [money]: (ot.type === "buy" ? 1 : -1) * ot.totalCost },
        transactions: [ot],
      };
    } else {
      wallet[coin].amount += Number(
        ((ot.type === "buy" ? 1 : -1) * ot.totalVolume).toFixed(2)
      );
      wallet[coin].transactions.push(ot);
      const cost = (ot.type === "buy" ? 1 : -1) * ot.totalCost;
      wallet[coin].totalPrice[money] = wallet[coin].totalPrice[money]
        ? wallet[coin].totalPrice[money] + cost
        : cost;
    }
    if (wallet[coin].amount === 0) {
      wallet[coin].totalPrice = {};
    }
  }

  return wallet;
};

type TotalBalance = {
  totalSell: Record<string, number>;
  totalBuy: Record<string, number>;
};

export const getTotalBalance = (
  sumOrderTransactions: OrderTransactionSummarized[]
): TotalBalance => {
  let buy: Record<string, number> = {};
  let sell: Record<string, number> = {};

  for (let tx of sumOrderTransactions) {
    if (tx.type === "buy") {
      buy[getMoneyName(tx.pair)] =
        (buy[getMoneyName(tx.pair)] ?? 0) + tx.totalCost;
    } else {
      sell[getMoneyName(tx.pair)] =
        (sell[getMoneyName(tx.pair)] ?? 0) + tx.totalCost;
    }
  }

  return {
    totalSell: sell,
    totalBuy: buy,
  };
};

type MonthlyTrades = Record<
  string,
  Record<string, OrderTransactionSummarized[]>
>;

export const tradesRawToMonthlyTrades = (trades: TradeRaw[]): MonthlyTrades => {
  return trades.reduce((acc: MonthlyTrades, curr: TradeRaw) => {
    const currentMonth = moment(curr.time).format("MM-yyyy");
    const currentOrderTxId = curr.ordertxid;

    if (!acc[currentMonth]) {
      acc[currentMonth] = {};
    }

    if (!acc[currentMonth][currentOrderTxId]) {
      acc[currentMonth] = {
        ...acc[currentMonth],
        [currentOrderTxId]: [],
      };
    }

    acc[currentMonth][currentOrderTxId].push(
      summarizeOrderTransactions(tradesRawToOrderTransactions(trade))
    );

    return acc;
  }, {});
};
