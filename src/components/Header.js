import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <>
        <h4 data-testid="email-field">{ email }</h4>
        <div id="divHeader">
          <p id="cifra">R$</p>
          <p data-testid="total-field">
            { expenses.length > 0 ? expenses.map((expense) => parseFloat(expense
              .value) * parseFloat(expense
              .exchangeRates[expense.currency].ask)).reduce((acc, curr) => {
              acc += parseFloat(curr);
              return acc;
            }, 0)
              .toFixed(2) : (0.00).toFixed(2) }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
