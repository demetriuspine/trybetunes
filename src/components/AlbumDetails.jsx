import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AlbumDetails extends Component {
  render() {
    const { artist: { artistName, collectionName } } = this.props;
    return (
      <section>
        <h2 data-testid="artist-name">{ artistName }</h2>
        <h3 data-testid="album-name">{ collectionName }</h3>
      </section>
    );
  }
}

AlbumDetails.propTypes = {
  artist: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
  }).isRequired,
};
