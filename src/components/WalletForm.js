import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    // const selectOptions = Object.keys(currencies[0]);
    return (
      <>
        <div>WalletForm</div>
        <input type="number" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select data-testid="currency-input">
          { currencies.map((currency) => <option key={ currency }>{currency}</option>)}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
