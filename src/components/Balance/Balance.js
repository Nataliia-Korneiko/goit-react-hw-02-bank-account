import React from 'react';
import PropTypes from 'prop-types';
import s from './balance.module.css';

const Balance = ({ balance, income, expenses }) => (
  <section className={s.balance}>
    <span className={s.total__deposit}>&#8593;{income}$</span>
    <span className={s.total__withdraw}>&#8595;{expenses}$</span>
    <span className={s.total__balance}>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default Balance;
