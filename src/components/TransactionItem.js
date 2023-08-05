import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const TransactionItem = ({ transaction, handleEdit, handleDestroy }) => {
  return (
    <div className="flex flex-row">
      <div>
        <img
          src={
            transaction.type === "Expense"
              ? "../../imgs/dollar-exp.png"
              : "../../imgs/dollar-in.png"
          }
          alt={transaction.type}
          className="w-10 h-10 mt-1"
        />
      </div>
      <div>
        <h1 className="font-semibold text-base">
          {transaction.title.charAt(0).toUpperCase() +
            transaction.title.slice(1)}
        </h1>
        <p className="font-normal text-sm -mt-1 w-[210px]">
          {transaction.type === "Expense" ? "-$" : "$"}
          {Number(transaction.amount).toFixed(2)}
        </p>
      </div>
      <div>
        <button className="py-1 px-2" onClick={() => handleEdit(transaction)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="py-1 px-2"
          onClick={() => handleDestroy(transaction.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
