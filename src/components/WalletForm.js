import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitAction, getAPI } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const API = await this.returnAPI();
    const keys = Object.keys(API);

    dispatch(submitAction('RETURN_API', keys));
  }

  returnAPI = async () => {
    const API = await getAPI();
    delete API.USDT;
    return API;
  };

  onChangeInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  stateInitial = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  editExpense = () => {
    const { dispatch, expenses, idToEdit } = this.props;
    const { value, description, currency,
      method, tag } = this.state;
    const expenseToEdit = expenses.map((expense) => {
      if (expense.id === idToEdit) {
        expense.value = value;
        expense.description = description;
        expense.currency = currency;
        expense.method = method;
        expense.tag = tag;
        return expense;
      }
      return expense;
    });
    dispatch(submitAction('CHANGE_EXPENSE', expenseToEdit));
    this.stateInitial();
  };

  addExpense = async () => {
    const { dispatch, expenses } = this.props;
    const API = await this.returnAPI();
    const data = this.state;
    data.exchangeRates = API;
    data.id = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0;
    dispatch(submitAction('SAVE_EXPENSE', data));
    this.stateInitial();
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency,
      method, tag } = this.state;
    return (
      <>
        <input
          name="value"
          value={ value }
          type="number"
          data-testid="value-input"
          onChange={ this.onChangeInput }
        />
        <input
          name="description"
          value={ description }
          type="text"
          data-testid="description-input"
          onChange={ this.onChangeInput }
        />
        <select
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.onChangeInput }
        >
          { currencies.map((currencyActual) => (
            <option key={ currencyActual }>
              {currencyActual}
            </option>))}
        </select>
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.onChangeInput }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.onChangeInput }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        { editor ? (
          <button type="button" onClick={ this.editExpense }>Editar despesa</button>)
          : (
            <button type="button" onClick={ this.addExpense }>
              Adicionar despesa
            </button>) }
      </>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
