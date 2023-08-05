import React, { useEffect, useState } from "react";
import TransactionItem from "../components/TransactionItem";
import Income from "./Income";
import Expense from "./Expense";

const ExpTracker = () => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);
  useEffect(() => {
    calculateTotalBalance(transactions);
  }, [transactions]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const newTransaction = transactions.map((t) =>
        t.id === editId ? { id: editId, type, title, amount } : t
      );
      setTransactions(newTransaction);
      setEditId("");
    } else {
      setTransactions([
        ...transactions,
        { id: Date.now(), type, title, amount },
      ]);
    }
    setTitle("");
    setAmount("");
    calculateTotalBalance(transactions); // Call calculateTotalBalance here
  };
  const handleEdit = (t) => {
    setEditId(t.id);
    setType(t.type);
    setTitle(t.title);
    setAmount(t.amount);
  };
  const handleDestroy = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    calculateTotalBalance(transactions); // Call calculateTotalBalance here
  };

  const calculateTotalBalance = (updatedTransactions) => {
    const totalIncome = updatedTransactions
      .filter((t) => t.type === "Income")
      .reduce((total, t) => total + parseFloat(t.amount), 0);

    const totalExpense = updatedTransactions
      .filter((t) => t.type === "Expense")
      .reduce((total, t) => total + parseFloat(t.amount), 0);

    setTotalBalance(totalIncome - totalExpense);
  };
  const calculateTotalIncome = () => {
    const totalIncome = transactions
      .filter((t) => t.type === "Income")
      .reduce((total, t) => total + parseFloat(t.amount), 0);

    return totalIncome;
  };
  const calculateTotalExpense = () => {
    const totalExpense = transactions
      .filter((t) => t.type === "Expense")
      .reduce((total, t) => total + parseFloat(t.amount), 0);

    return totalExpense;
  };
  return (
    <div className="flex space-x-5 ml-4 justify-center">
      <div className="bg-white w-72 h-80 mt-32 border-b-[5px] border-green-500 p-3 rounded-lg ">
        <Income totalIncome={calculateTotalIncome()} />
      </div>
      <div className="bg-white h-[540px] w-[420px] rounded-lg shadow-lg mt-10">
        <h1 className="text-2xl font-bold text-center p-3">Expense Tracker</h1>
        <div className="flex justify-center">
          <h1 className="text-lg font-bold text-center mt-3">Total Balance:</h1>
          <h2 className="text-lg font-semibold ml-4 mt-3">
            {totalBalance >= 0 ? "$" : "-$"}
            {Math.abs(totalBalance).toFixed(2)}
          </h2>
        </div>
        <div className="mt-5 w-[350px] h-[390px] p-3 mx-auto rounded shadow-lg border border-gray-100">
          <h1 className="text-lg font-semibold text-center">
            Add Your Transaction
          </h1>
          <form
            className="flex flex-col text-center h-[280px] boder-1 border-double border-indigo-600 w-full justify-between my-3"
            onSubmit={handleSubmit}
          >
            <select
              className="border border-slate-300 rounded-md w-full px-1 py-1"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <input
              type="text"
              className="border border-slate-300 rounded-md w-full px-1 py-1"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              min="0.01"
              step="0.01"
              className="border border-slate-300 rounded-md w-full px-1 py-1"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button
              className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ringfocus:ring-purple-300 px-2 py-2 text-white rounded-full mb-[110px] ml-20 mr-20"
              type="submit"
            >
              Add Transaction
            </button>
          </form>
          <div className="h-32 -mt-28 overflow-auto">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                handleEdit={handleEdit}
                handleDestroy={handleDestroy}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white w-72 h-80 mt-32 border-b-[5px] border-red-600 p-3 rounded-lg">
        <Expense totalExpense={calculateTotalExpense()} />
      </div>
    </div>
  );
};

export default ExpTracker;
