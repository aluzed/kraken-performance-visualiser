import React from "react";
import Badge from "./badge";

type CoinTileParams = {
  coin: string;
  amount: number;
  value: Record<string, number>;
  transactionsCount: number;
};

export default function CoinTile({
  coin,
  amount,
  value,
  transactionsCount,
}: CoinTileParams) {
  return (
    <div className="w-72 h-64 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 me-4 mb-4">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {coin}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Quantity: {amount}
      </p>
      {Object.keys(value).length > 0 && (
        <h1 className="text-gray-900 dark:text-white">Price</h1>
      )}
      {Object.keys(value).map((money) => {
        return (
          <p
            key={money}
            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
          >
            {money}: {value[money]}
          </p>
        );
      })}
      <Badge color="green">{transactionsCount} transactions</Badge>
    </div>
  );
}
