import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitAction } from '../redux/actions';
import './Login.css';
import logo from '../images/logo.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonState: true,
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  verifyBtn = () => {
    const lengthPassword = 6;
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length >= lengthPassword;
    const btnState = verifyEmail && verifyPassword;
    this.setState({ buttonState: !(btnState) });
  };

  saveEmailGlobal = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(submitAction('EMAIL-LOGIN', email));
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonState } = this.state;
    return (
      <div className="card">
        <img className="logo" src={ logo } alt="logo" />
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="E-mail"
          onChange={ this.handleInput }
          data-testid="email-input"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />
        <input
          type="password"
          name="password"
          value={ password }
          placeholder="Password"
          onChange={ this.handleInput }
          data-testid="password-input"
          min={ 6 }
          required
        />
        <button type="submit" onClick={ this.saveEmailGlobal } disabled={ buttonState }>
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null)(Login);
