import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      btnDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = ({ target }) => {
    const minChar = 3;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (name === 'name') {
      this.setState({
        btnDisabled: value.length < minChar,
      });
    }
  };

  handleClick = (handleSub) => {
    const { name } = this.state;
    this.setState({ loading: true });
    createUser({ name }).then(() => {
      handleSub();
    });
  };

  render() {
    const { name, loading, btnDisabled } = this.state;
    const { handleSub } = this.props;
    return (
      <div className="page-login" data-testid="page-login">
        {loading ? (
          <Loading loading={ loading } />
        ) : (
          <form>
            <label htmlFor="login-name-input">
              Nome:
              <input
                id="login-name-input"
                data-testid="login-name-input"
                name="name"
                type="text"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              onClick={ () => {
                this.handleClick(handleSub);
              } }
              disabled={ btnDisabled }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  handleSub: PropTypes.func.isRequired,
};

export default Login;
