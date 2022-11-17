import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

const emailID = 'email-input';
const passwordID = 'password-input';

describe('Testa se os componentes são renderizados na tela inicial', () => {
  test('Se existe um input de e-mail', () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByTestId(emailID);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('email');
  });
  test('Se existe um input de senha', () => {
    renderWithRedux(<Login />);
    const passwordInput = screen.getByTestId(passwordID);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.type).toBe('password');
    expect(passwordInput.min).toBe('6');
  });
  test('Se existe o botão de entrada e funciona de forma correta', () => {
    renderWithRedux(<Login />);
    const buttonInput = screen.getByRole('button');
    expect(buttonInput).toBeInTheDocument();
    expect(buttonInput.disabled).toBe(true);
    const emailInput = screen.getByTestId(emailID);
    const passwordInput = screen.getByTestId(passwordID);
    userEvent.type(emailInput, 'trybe@teste.com');
    userEvent.type(passwordInput, '123456');
    expect(buttonInput.disabled).toBe(false);
  });
  test('Se existe o botão de entrada e funciona de forma correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonInput = screen.getByRole('button');
    expect(buttonInput).toBeInTheDocument();
    expect(buttonInput.disabled).toBe(true);
    const emailInput = screen.getByTestId(emailID);
    const passwordInput = screen.getByTestId(passwordID);
    userEvent.type(emailInput, 'trybe@teste.com');
    userEvent.type(passwordInput, '123456');
    expect(buttonInput.disabled).toBe(false);
    userEvent.click(buttonInput);
    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
