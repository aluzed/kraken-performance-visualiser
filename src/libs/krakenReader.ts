import {
  OrderTransactionSummarized,
  OrderTransactions,
} from "../types/orderTransactions";
import { OrganizedWallet } from "../types/organizedWallet";
import { TradeRaw, serializeTrade } from "../types/trade";

export const tradeRawToOrderTransactions = (tradeRawRows: TradeRaw[]) => {
  const orderTransactions: OrderTransactions = {};

  for (const trade of tradeRawRows) {
    if (orderTransactions[trade.ordertxid]) {
      orderTransactions[trade.ordertxid].push(serializeTrade(trade));
    } else {
      orderTransactions[trade.ordertxid] = [serializeTrade(trade)];
    }
  }

  return orderTransactions;
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

export const getCryptoName = (coinName: string) => {
  return coinName.replace(/(EUR|USD|USDT)$/g, "");
};

export const getMoneyName = (coinName: string) => {
  return coinName.match(/(EUR|USD|USDT)$/g)?.[0] ?? "";
};

type PairName = {
  coin: string;
  money: string;
};

export const splitPairName = (coinName: string): PairName => {
  return {
    coin: getCryptoName(coinName),
    money: getMoneyName(coinName),
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
  totalSell: number;
  totalBuy: number;
};

export const getTotalBalance = (
  sumOrderTransactions: OrderTransactionSummarized[]
): TotalBalance => {
  let buy = 0;
  let sell = 0;

  for (let tx of sumOrderTransactions) {
    if (tx.type === "buy") {
      buy += tx.totalCost;
    } else {
      sell += tx.totalCost;
    }
  }

  return {
    totalSell: sell,
    totalBuy: buy,
  };
};
