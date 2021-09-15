import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              data-testid="search-artist-input"
              name="search"
              type="text"
              value={ search }
              onChange={ this.handleChange }
            />
            <input
              data-testid="search-artist-button"
              type="button"
              value="Pesquisar"
              disabled={ search.length <= 1 }
            />
          </label>
        </form>
      </div>
    );
  }
}
