import moment from "moment";
import { OrderType } from "./orderType";
import { TradeType } from "./tradeType";

export type Trade = {
  transactionId: string;
  orderTransactionId: string;
  pair: string;
  time: Date;
  type: TradeType;
  orderType: OrderType;
  price: number;
  cost: number;
  fee: number;
  volume: number;
  margin: number;
  misc: string;
  ledgers: string;
};

export type TradeRaw = {
  txid: string;
  ordertxid: string;
  pair: string;
  time: string;
  type: TradeType;
  ordertype: OrderType;
  price: string;
  cost: string;
  fee: string;
  vol: string;
  margin: string;
  misc: string;
  ledgers: string;
};

export const serializeTrade = (tr: TradeRaw): Trade => {
  return {
    transactionId: tr.txid,
    orderTransactionId: tr.ordertxid,
    pair: tr.pair,
    time: moment(tr.time).toDate(),
    type: tr.type,
    orderType: tr.ordertype,
    price: Number(tr.price),
    cost: Number(tr.cost),
    fee: Number(tr.fee),
    volume: Number(tr.vol),
    margin: Number(tr.margin),
    misc: tr.misc,
    ledgers: tr.ledgers,
  };
};
