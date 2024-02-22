import React from "react";
import { FaThList } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import useKraken from "../hooks/useKraken";

export default function Footer() {
  const { setViewName } = useKraken();
  return (
    <div className="fixed bottom-0 left-20 right-20 h-14 flex justify-center">
      <div className="fixed bottom-0 bg-white rounded-tl-lg rounded-tr-lg shadow-xl px-4 pt-2 flex flex-row justify-center">
        <button
          type="button"
          className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => setViewName("TRANSACTIONS_LIST")}
        >
          <FaThList />
        </button>

        <button
          type="button"
          className="py-2.5 px-5 ms-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => setViewName("WALLET")}
        >
          <FaWallet />
        </button>
      </div>
    </div>
  );
}
