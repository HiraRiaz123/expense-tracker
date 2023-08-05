import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div className="flex space-x-5 ml-4">
      <div className="bg-white w-72 h-80 mt-32 border-b-[5px] border-green-400 p-3">
        <h1>Income</h1>
      </div>
      <div className="mb-8 bg-white h-[470px] w-[420px] rounded-lg shadow-lg mt-5">
        <h1 className="text-2xl font-bold text-center p-3">Expense Tracker</h1>
        <div className="flex justify-center">
          <h1 className="text-lg font-bold text-center">Total Balance:</h1>
          <h2 className="text-lg font-semibold ml-4">
            {totalBalance >= 0 ? "$" : "-$"}
            {Math.abs(totalBalance).toFixed(2)}
          </h2>
        </div>
        <div className="mt-3 w-[350px] h-[360px] p-3 mx-auto rounded shadow-lg border border-gray-100">
          <h1 className="text-lg font-semibold text-center">
            Add Your Transaction
          </h1>
          <form
            className="flex flex-col text-center h-[280px] boder-1 border-double border-indigo-600 w-full justify-between my-2"
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
              className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ringfocus:ring-purple-300 px-2 py-2 text-white rounded-full mb-[115px] ml-20 mr-20"
              type="submit"
            >
              Add Transaction
            </button>
          </form>
          <div className="h-32 -mt-28 overflow-auto">
            {transactions.map((t) => (
              <div key={t.id} className="flex flex-row">
                <div>
                  <img
                    src={
                      t.type === "Expense"
                        ? "../../imgs/dollar-exp.png"
                        : "../../imgs/dollar-in.png"
                    }
                    alt={t.type}
                    className="w-10 h-10 mt-1"
                  />
                </div>
                <div>
                  <h1 className="font-semibold text-base">
                    {t.title.charAt(0).toUpperCase() + t.title.slice(1)}
                  </h1>
                  <p className="font-normal text-sm -mt-1 w-[210px]">
                    {t.type === "Expense" ? "-$" : "$"}
                    {Number(t.amount).toFixed(2)}
                  </p>
                </div>
                <div>
                  <button className="py-1 px-2" onClick={() => handleEdit(t)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="py-1 px-2"
                    onClick={() => handleDestroy(t.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white w-72 h-80 mt-32 border-b-[5px] border-red-400 p-3">
        <h1>Expense</h1>
      </div>
    </div>
  );
};

export default ExpTracker;
