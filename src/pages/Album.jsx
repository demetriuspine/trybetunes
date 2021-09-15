import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musicArray: [],
    };
  }

  componentDidMount() {
    this.getMusicsFromApi();
  }

  getMusicsFromApi = async () => {
    const { match: { params: { id } } } = this.props;
    const getMusicResponse = await getMusics(id);
    this.setState({ musicArray: getMusicResponse });
  }

  render() {
    const { musicArray } = this.state;
    return (
      <main data-testid="page-album">
        <Header />
        { musicArray.map((music) => (<MusicCard
          key={ music.trackId }
          music={ music }
        />))}
      </main>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
