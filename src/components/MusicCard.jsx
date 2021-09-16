import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  handleChange = ({ target }) => {
    const { fetchAddSong, music } = this.props;
    fetchAddSong(music, target);
  }

  render() {
    const { music: {
      trackName,
      previewUrl,
      trackId,
    }, checked } = this.props;
    return (
      <section>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor={ `track-${trackId}` }
        >
          <input
            type="checkbox"
            id={ `track-${trackId}` }
            checked={ checked }
            value={ trackId }
            onChange={ this.handleChange }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number,
  }).isRequired,
  fetchAddSong: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
