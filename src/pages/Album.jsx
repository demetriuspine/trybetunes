import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getMusicsFromApi();
    this.fetchGetFavoriteSongs();
  }

  getMusicsFromApi = async () => {
    const { match: { params: { id } } } = this.props;
    const getMusicResponse = await getMusics(id);
    const albumMusics = getMusicResponse.slice(1);
    const details = getMusicResponse[0];
    this.setState({ musicArray: albumMusics, artistDetails: details, loading: false });
  }

  fetchGetFavoriteSongs = () => {
    this.setState({ loading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        favoriteSongs,
        loading: false,
      });
    });
  }

  fetchAddSong = (musics, target) => {
    const { checked } = target;
    const handleSongs = checked ? addSong : removeSong;
    this.setState({ loading: true }, async () => {
      await handleSongs(musics);
      this.fetchGetFavoriteSongs();
    });
  }

  renderContent() {
    const { musicArray, artistDetails, favoriteSongs } = this.state;
    return (
      <main data-testid="page-album">
        <AlbumDetails artist={ artistDetails } />
        { musicArray.map((music) => (<MusicCard
          key={ music.trackId }
          music={ music }
          fetchAddSong={ this.fetchAddSong }
          checked={ favoriteSongs
            .some(({ trackId }) => trackId === music.trackId) }
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
