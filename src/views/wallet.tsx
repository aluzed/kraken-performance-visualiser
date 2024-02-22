import React from "react";
import useKraken from "../hooks/useKraken";
import CoinTile from "../components/coinTile";

export default function WalletView() {
  const { wallet } = useKraken();
  console.log(wallet);
  return (
    <div className="w-full px-20 mt-20">
      <div className="flex pb-20 justify-center flex-wrap">
        {Object.keys(wallet).map((coin) => {
          const c = wallet[coin];
          return (
            <CoinTile
              key={coin}
              amount={c.amount}
              coin={coin}
              transactionsCount={c.transactions.length}
              value={c.totalPrice}
            />
          );
        })}
      </div>
    </div>
  );
}
