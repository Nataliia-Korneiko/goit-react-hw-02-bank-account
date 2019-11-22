import React from 'react';
import PropTypes from 'prop-types';
import s from './transactionHistory.module.css';

const TransactionHistory = ({ transactions }) => (
  <table className={s.history}>
    <thead>
      <tr className={s.history__header}>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(el => (
        <tr key={el.id} className={s.history__deposit}>
          <td>{el.type}</td>
          <td>{el.amount}</td>
          <td>{el.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      amount: PropTypes.number,
      date: PropTypes.string,
    }),
  ).isRequired,
};

export default TransactionHistory;
