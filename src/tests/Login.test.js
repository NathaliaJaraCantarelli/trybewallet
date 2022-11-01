import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testa se os componentes são renderizados na tela inicial', () => {
  test('Se existe um input de e-mail', () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('text');
  });
  test('Se existe um input de senha', () => {
    renderWithRedux(<Login />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.type).toBe('text');
    expect(passwordInput.min).toBe('6');
  });
  test('Se existe o botão de entrada e funciona de forma correta', () => {
    renderWithRedux(<Login />);
    const buttonInput = screen.getByRole('button');
    expect(buttonInput).toBeInTheDocument();
    expect(buttonInput.disabled).toBe(true);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, 'trybe@teste.com');
    userEvent.type(passwordInput, '123456');
    expect(buttonInput.disabled).toBe(false);
  });
});
