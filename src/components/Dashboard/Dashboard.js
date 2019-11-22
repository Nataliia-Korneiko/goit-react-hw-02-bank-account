/* eslint-disable no-alert */
/* eslint-disable consistent-return */
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
      balance: prevState.balance + prevState.amount,
    }));
    this.changeTransactions('DEPOSIT');
  };

  handleWithdraw = () => {
    const { balance } = this.state;
    const { amount } = this.state;

    if (balance < amount) {
      return toast.error(
        'На счету недостаточно средств для проведения операции!',
        {
          position: toast.POSITION.TOP_RIGHT,
        },
      );
    }

    this.setState(prevState => ({
      balance: prevState.balance - prevState.amount,
    }));
    this.changeTransactions('WITHDRAW');
  };

  handleChange = e => {
    console.log('e.target :', e.target);
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
    const { transactions } = this.state;
    const { balance } = this.state;
    const income = transactions.reduce((acc, el) => {
      let newAcc = acc;
      if (el.type === 'DEPOSIT') newAcc = acc + el.amount;
      return newAcc;
    }, 0);

    // console.log('income', income);

    const expenses = transactions.reduce((acc, el) => {
      let newAcc = acc;
      if (el.type === 'WITHDRAW') newAcc = acc + el.amount;
      return newAcc;
    }, 0);

    // console.log('expenses', expenses);

    return (
      <div className={s.dashboard}>
        <Controls
          handleChange={this.handleChange}
          onDeposit={this.handleDeposit}
          onWithdraw={this.handleWithdraw}
        />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory transactions={transactions} />
        <ToastContainer />
      </div>
    );
  }
}
