import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     totalField: 0,
  //     currencyField: 'BRL',
  //   };
  // }

  render() {
    const { email } = this.props;
    return (
      <>
        <h4 data-testid="email-field">{ email }</h4>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

export default connect(mapStateToProps)(Header);
