import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <div className="initial">
          <Header />
          <WalletForm />
        </div>
        <div className="wallet-table">
          <Table />
        </div>
      </>
    );
  }
}

export default Wallet;
