import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa se os componentes são renderizados na tela inicial', () => {
  test('Se existe um e-mail', () => {
    renderWithRedux(<Wallet />);
    const emailField = screen.getByTestId('email-field');
    expect(emailField).toBeInTheDocument();
  });
  test('Se existe o valor total iniciando em zero', () => {
    renderWithRedux(<Wallet />);
    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
    expect(totalField.textContent).toBe('0.00');
  });
  test('Se existe o tipo de moeda BRL', () => {
    renderWithRedux(<Wallet />);
    const headerCurrencyField = screen.getByTestId('header-currency-field');
    expect(headerCurrencyField).toBeInTheDocument();
    expect(headerCurrencyField.textContent).toBe('BRL');
  });
  test('Se existe o input de valor', () => {
    renderWithRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
    expect(valueInput.type).toBe('number');
  });
  test('Se existe o input de descrição', () => {
    renderWithRedux(<Wallet />);
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput.type).toBe('text');
  });
  test('Se existe a seleção de moeda', () => {
    renderWithRedux(<Wallet />);
    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
  });
  test('Se existe a seleção de metodo de pagamento', () => {
    renderWithRedux(<Wallet />);
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
  });
  test('Se existe a seleção de tag', () => {
    renderWithRedux(<Wallet />);
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
  });
});

describe('Testa de ao adicionar uma nova despesa, tudo funciona', () => {
  test('Se ao apertar o botão, a despesa aparece na tela', async () => {
    renderWithRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '100');
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'Mercado');
    const buttonAdd = screen.getByRole('button');
    userEvent.click(buttonAdd);
    expect(valueInput.textContent).toBe('');
    expect(descriptionInput.textContent).toBe('');
  });
});
