import React, { Component } from 'react';
import AlbumList from '../components/AlbumList';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      loading: false,
      artistsAlbum: [],
      searchedContent: '',
      showResults: false,
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  onClick = async () => {
    this.setState(
      { loading: true, showResults: false },
      async () => {
        const { search } = this.state;
        const requestedString = search;
        const fetchApiReturn = await searchAlbumsAPI(requestedString);
        this.setState(
          { loading: false,
            search: '',
            artistsAlbum: fetchApiReturn,
            searchedContent: requestedString,
            showResults: true },
        );
      },
    );
  }

  searchComponent() {
    const { search, searchedContent } = this.state;
    return (
      <section data-testid="page-search">
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
              onClick={ this.onClick }
            />
          </label>
        </form>
        <h1>
          { searchedContent.length === 0
            ? ''
            : `Resultado de álbuns de: ${searchedContent}` }
        </h1>
      </section>
    );
  }

  render() {
    const { loading, artistsAlbum, showResults } = this.state;
    const results = artistsAlbum.length === 0
      ? 'Nenhum álbum foi encontrado'
      : <AlbumList albumsArray={ artistsAlbum } />;
    return (
      <>
        <Header />
        { loading ? <Loading /> : this.searchComponent() }
        <main>
          { showResults ? results : '' }
        </main>
      </>
    );
  }
}
