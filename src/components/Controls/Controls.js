import React from 'react';
import PropTypes from 'prop-types';
import s from './controls.module.css';

const Controls = ({ handleChange, onDeposit, onWithdraw, amount }) => (
  <section className={s.controls}>
    <input
      onChange={handleChange}
      className={s.controls__input}
      type="number"
      name="amount"
      min="0"
      value={amount === 0 ? '' : amount}
    />
    <button onClick={onDeposit} className={s.controls__button} type="button">
      Deposit
    </button>
    <button onClick={onWithdraw} className={s.controls__button} type="button">
      Withdraw
    </button>
  </section>
);

Controls.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onDeposit: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
};

export default Controls;
