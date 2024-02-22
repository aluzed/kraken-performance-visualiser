import React from "react";
import Papa, { ParseResult } from "papaparse";
import useKraken from "../hooks/useKraken";
import type { Trade, TradeRaw } from "../types/trade";
import KrakenLogo from "../kraken.png";
import { FaFileCsv } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const { parsedData, updateKrakenData, closeKrakenFile } = useKraken();

  const readFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<TradeRaw>(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (result: ParseResult<TradeRaw>) {
          updateKrakenData(result);
        },
      });
    }
  };

  const importInputRef = React.createRef<HTMLInputElement>();

  return (
    <div className="px-20 fixed top-0 left-0 right-0 bg-white">
      <h1 className="text-3xl font-bold w-full text-center">
        <img src={KrakenLogo} width={64} height={64} className="inline" />
        Kraken Performance Visualizer
      </h1>

      <input
        type="file"
        name="upload"
        accept=".csv"
        onChange={readFile}
        style={{ display: "none" }}
        ref={importInputRef}
      />

      {parsedData.length === 0 && (
        <button
          className="absolute right-10 top-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (importInputRef.current) {
              importInputRef.current.click();
            }
          }}
        >
          <FaFileCsv className="inline" /> Import CSV
        </button>
      )}

      {parsedData.length > 0 && (
        <button
          className="absolute right-10 top-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          title="Close current CSV"
          onClick={() => {
            closeKrakenFile();
            if (importInputRef.current) {
              importInputRef.current.value = "";
            }
          }}
        >
          <IoMdClose />
        </button>
      )}
    </div>
  );
}
