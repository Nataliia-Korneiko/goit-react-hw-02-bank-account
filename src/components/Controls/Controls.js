import React from 'react';
import PropTypes from 'prop-types';
import s from './controls.module.css';

const Controls = ({ handleChange, onDeposit, onWithdraw }) => (
  <section className={s.controls}>
    <input
      onChange={handleChange}
      className={s.controls__input}
      type="number"
      name="amount"
      min="0"
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
};

export default Controls;
