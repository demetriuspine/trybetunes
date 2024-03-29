import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    getUser().then(({ name }) => this.setState({ name, loading: false }));// https://stackoverflow.com/questions/35850118/setting-state-on-componentdidmount
  }

  usernameComponent() {
    const { name } = this.state;
    return (
      <h1 data-testid="header-user-name">
        { name }
      </h1>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : this.usernameComponent()}
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}
