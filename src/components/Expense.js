import React from "react";

const Expense = ({ totalExpense }) => {
  return (
    <div>
      <h1 className="text-lg font-bold text-center">Expense</h1>
      <h1 className="text-xl font-bold text-center text-red-600">
      $ {totalExpense}
      </h1>
      <img src="../../imgs/loss.png" alt="expense" className="w-80 h-56 mt-2"/>
    </div>
  );
};

export default Expense;
