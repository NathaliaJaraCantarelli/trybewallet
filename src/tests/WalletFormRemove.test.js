import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const nameDescriptionInput = 'description-input';
const nameValueInput = 'value-input';

describe('Testa se a tabela funciona corretamente', () => {
  test('Se ao adicionar uma nova despesa e depois remover os dados aparecem e somem da tabela', async () => {
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
    userEvent.click(buttonRemove);
    expect(mercado).not.toBeInTheDocument();
  });
});
