import React, { Component } from 'react';
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
      </header>
    );
  }
}
