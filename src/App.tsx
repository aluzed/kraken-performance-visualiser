import React from "react";
import "./App.css";
import useKraken from "./hooks/useKraken";
import Header from "./components/header";
import TransactionListView from "./views/transactionList";
import Footer from "./components/footer";
import WalletView from "./views/wallet";

function App() {
  const { viewName } = useKraken();

  return (
    <div className="App">
      <Header />

      {String(viewName) === "TRANSACTIONS_LIST" && <TransactionListView />}
      {String(viewName) === "WALLET" && <WalletView />}

      <Footer />
    </div>
  );
}

export default App;
