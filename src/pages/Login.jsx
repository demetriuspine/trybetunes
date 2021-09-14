import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      logged: false,
      loading: false,
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ logged: true });
  }

  loginComponent() {
    const { name } = this.state;
    return (
      <form>
        <label htmlFor="login-name-input">
          <input
            type="text"
            data-testid="login-name-input"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            required
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ name.length <= 2 }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </label>
      </form>
    );
  }

  render() {
    const { loading, logged } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : this.loginComponent() }
        { logged ? <Redirect to="/search" /> : ''}
      </div>
    );
  }
}
