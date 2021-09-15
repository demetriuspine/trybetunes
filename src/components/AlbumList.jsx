import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumLIst extends Component {
  render() {
    const { albumsArray } = this.props;
    const mapArtist = albumsArray.map(({ artistName,
      collectionId, collectionName, artworkUrl100,
    }) => (
      <Link
        key={ collectionId }
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div>
          <p>{ artistName }</p>
          <img src={ artworkUrl100 } alt={ `album ${collectionName}` } />
          <p>{ collectionName }</p>
        </div>
      </Link>
    ));

    return (
      <section>
        { mapArtist }
      </section>
    );
  }
}

AlbumLIst.propTypes = {
  albumsArray: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
