import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const nameDescriptionInput = 'description-input';
const nameValueInput = 'value-input';

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
    const valueInput = screen.getByTestId(nameValueInput);
    expect(valueInput).toBeInTheDocument();
    expect(valueInput.type).toBe('number');
  });
  test('Se existe o input de descrição', () => {
    renderWithRedux(<Wallet />);
    const descriptionInput = screen.getByTestId(nameDescriptionInput);
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

describe('Testa se aparece a tabela', () => {
  test('Se o cabeçalho é renderizado', () => {
    renderWithRedux(<Wallet />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    const tag = screen.getByText(/Tag/i);
    expect(tag).toBeInTheDocument();
  });
});

describe('Testa se ao adicionar uma nova despesa, tudo funciona', () => {
  test('Se ao apertar o botão, a despesa aparece na tela', async () => {
    renderWithRedux(<Wallet />);
    const valueInput = screen.getByTestId(nameValueInput);
    userEvent.type(valueInput, '100');
    const descriptionInput = screen.getByTestId(nameDescriptionInput);
    userEvent.type(descriptionInput, 'Mercado');
    const buttonAdd = screen.getByRole('button');
    userEvent.click(buttonAdd);
    expect(valueInput.textContent).toBe('');
    expect(descriptionInput.textContent).toBe('');
  });
});

describe('Testa se a tabela funciona corretamente', () => {
  test('Se ao adicionar uma nova despesa, os dados aparecem na tabela', async () => {
    renderWithRedux(<Wallet />);
    const valueInput = screen.getByTestId(nameValueInput);
    userEvent.type(valueInput, '100');
    const descriptionInput = screen.getByTestId(nameDescriptionInput);
    userEvent.type(descriptionInput, 'Mercado');
    const buttonAdd = screen.getAllByRole('button');
    userEvent.click(buttonAdd[0]);
    jest.spyOn(global, 'fetch');
    global.fetch = fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const mercado = await screen.findByText(/Mercado/i);
    expect(mercado).toBeInTheDocument();
    const buttonRemove = screen.getByTestId('delete-btn');
    expect(buttonRemove).toBeInTheDocument();
    const buttonEdit = screen.getByTestId('edit-btn');
    expect(buttonEdit).toBeInTheDocument();
  });
});
