import React from "react";
import "./App.css";
import useKraken from "./hooks/useKraken";
import Header from "./components/header";
import TransactionList from "./views/transactionList";

function App() {
  const { viewName } = useKraken();

  return (
    <div className="App">
      <Header />

      {String(viewName) === "TRANSACTIONS_LIST" && <TransactionList />}
    </div>
  );
}

export default App;
