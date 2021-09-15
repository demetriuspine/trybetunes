import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  artistDetails() {
    const { music: { artistName, collectionName } } = this.props;
    return (
      <section>
        <h2 data-testid="artist-name">{ artistName }</h2>
        <h3 data-testid="album-name">{ collectionName }</h3>
      </section>
    );
  }

  songs() {
    const { music: { trackName, previewUrl } } = this.props;
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

  render() {
    const { music: { wrapperType } } = this.props;
    return (
      <main>
        { wrapperType === 'collection' ? this.artistDetails() : this.songs() }
      </main>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    wrapperType: PropTypes.string,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
  }).isRequired,
};
