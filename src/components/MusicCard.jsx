import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { music: {
      trackName, previewUrl, kind, artistName, collectionName } } = this.props;
    if (kind === undefined) {
      return (
        <section>
          <h2 data-testid="artist-name">{ artistName }</h2>
          <h3 data-testid="album-name">{ collectionName }</h3>
        </section>
      );
    }
    if (kind === 'song') {
      return (
        <section>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </section>
      );
    }
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    kind: PropTypes.string,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
  }).isRequired,
};
