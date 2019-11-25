import React, { Component } from 'react';
import uuid from 'uuid/v1';
import { ToastContainer, toast } from 'react-toastify';
import s from './dashboard.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    amount: 0,
    balance: 0,
  };

  handleDeposit = () => {
    const { amount } = this.state;
    if (amount === 0 || amount < 0) {
      return toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    this.setState(prevState => ({
      balance: +Number(prevState.balance + prevState.amount).toFixed(2),
    }));
    this.changeTransactions('DEPOSIT');
    return this.reset();
  };

  handleWithdraw = () => {
    const { balance } = this.state;
    const { amount } = this.state;

    if (amount === 0 || amount < 0) {
      return toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (balance < amount) {
      return toast.error(
        'На счету недостаточно средств для проведения операции!',
        {
          position: toast.POSITION.TOP_RIGHT,
        },
      );
    }

    this.setState(prevState => ({
      balance: +Number(prevState.balance - prevState.amount).toFixed(2),
    }));
    this.changeTransactions('WITHDRAW');
    return this.reset();
  };

  reset = () => {
    this.setState({ amount: 0 });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: +value });
  };

  changeTransactions = type => {
    const { amount } = this.state;
    const newTransactions = {
      id: uuid(),
      type,
      amount,
      date: new Date().toLocaleString(),
    };

    this.setState(state => ({
      transactions: [...state.transactions, newTransactions],
    }));
  };

  render() {
    const { transactions, amount } = this.state;
    const { balance } = this.state;
    const income = transactions.reduce((acc, el) => {
      let newAcc = acc;
      if (el.type === 'DEPOSIT') newAcc = acc + el.amount;
      return newAcc;
    }, 0);

    const expenses = transactions.reduce((acc, el) => {
      let newAcc = acc;
      if (el.type === 'WITHDRAW') newAcc = acc + el.amount;
      return newAcc;
    }, 0);

    return (
      <div className={s.dashboard}>
        <Controls
          handleChange={this.handleChange}
          onDeposit={this.handleDeposit}
          onWithdraw={this.handleWithdraw}
          amount={amount}
        />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory transactions={transactions} />
        <ToastContainer />
      </div>
    );
  }
}
