import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const nameDescriptionInput = 'description-input';
const nameValueInput = 'value-input';

describe('Testa se a tabela funciona corretamente', () => {
  test('Se ao adicionar uma nova despesa, os dados aparecem na tabela', async () => {
    renderWithRedux(<Wallet />);
    const valueInput = screen.getByTestId(nameValueInput);
    const descriptionInput = screen.getByTestId(nameDescriptionInput);
    const buttonAdd = screen.getAllByRole('button');

    userEvent.type(valueInput, '100');
    userEvent.type(descriptionInput, 'Mercado');
    userEvent.click(buttonAdd[0]);

    const mercado = await screen.findByText(/Mercado/i);
    expect(mercado).toBeInTheDocument();

    userEvent.type(valueInput, '200');
    userEvent.type(descriptionInput, 'Academia');
    userEvent.click(buttonAdd[0]);

    const academia = await screen.findByText(/Academia/i);
    expect(academia).toBeInTheDocument();

    const buttonEdit = await screen.findAllByRole('button');
    console.log(buttonEdit.length);
    userEvent.click(buttonEdit[1]);

    userEvent.type(valueInput, '150');
    userEvent.type(descriptionInput, 'Restaurante');
    userEvent.click(buttonAdd[0]);

    const restaurante = await screen.findByText(/Restaurante/i);
    expect(restaurante).toBeInTheDocument();
    expect(academia).toBeInTheDocument();
  });
});
