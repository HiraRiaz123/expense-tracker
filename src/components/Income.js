import React from "react";

const Income = ({ totalIncome }) => {
  return (
    <div>
      <h1 className="text-lg font-bold text-center">Income</h1>
      <h1 className="text-xl font-bold text-center text-green-500">
      $ {totalIncome}
      </h1>
      <img src="../../imgs/gain.png" alt="income" className="w-80 h-56 mt-2"/>
    </div>
  );
};

export default Income;
