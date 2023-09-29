import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitAction } from '../redux/actions';
import edit from '../images/edit.png';
import remove from '../images/remove.png';
import './Table.css';

class Table extends Component {
  removeItem = (index) => {
    const { expenses, dispatch } = this.props;
    const data = expenses.filter((expense, indexExpense) => index !== indexExpense);
    dispatch(submitAction('CHANGE_EXPENSE', data));
  };

  editItem = (index) => {
    const { expenses, dispatch } = this.props;
    dispatch(submitAction('EDIT_EXPENSE', expenses[index].id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="total-table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody data-testid="tbody">
            { (expenses.map((expense, index) => (
              <tr name="tr" key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  { (parseFloat(expense
                    .exchangeRates[expense.currency].ask) * parseFloat(expense
                    .value)).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className="btn-edit-remove"
                    data-testid="edit-btn"
                    onClick={ () => this.editItem(index) }
                  >
                    <img src={ edit } alt="Editar" className="img-edit" />
                  </button>
                  <button
                    type="button"
                    className="btn-edit-remove"
                    data-testid="delete-btn"
                    onClick={ () => this.removeItem(index) }
                  >
                    <img src={ remove } alt="Excluir" className="img-remove" />
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
