import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import AlbumDetails from '../components/AlbumDetails';
import Loading from '../components/Loading';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicArray: [],
      artistDetails: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.getMusicsFromApi();
  }

  getMusicsFromApi = async () => {
    const { match: { params: { id } } } = this.props;
    const getMusicResponse = await getMusics(id);
    const albumMusics = getMusicResponse.slice(1);
    const details = getMusicResponse[0];
    this.setState({ musicArray: albumMusics, artistDetails: details, loading: false });
  }

  renderContent() {
    const { musicArray, artistDetails } = this.state;
    return (
      <main data-testid="page-album">
        <AlbumDetails artist={ artistDetails } />
        { musicArray.map((music) => (<MusicCard
          key={ music.trackId }
          music={ music }
        />))}
      </main>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        <Header />
        { loading ? <Loading /> : this.renderContent() }
      </>
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
