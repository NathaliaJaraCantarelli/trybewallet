import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     renderState: true,
  //   };
  // }

  render() {
    const { email, expenses } = this.props;
    return (
      <>
        <h4 data-testid="email-field">{ email }</h4>
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
