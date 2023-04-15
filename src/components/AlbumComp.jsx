import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumComp extends Component {
  render() {
    const {
      album: { artistName, artworkUrl100, collectionId, collectionName } } = this.props;
    return (
      <div data-testid="album-card" className="album-card">
        <Link
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img
            src={ artworkUrl100 }
            alt={ `Capa do álbum ${collectionName}` }
            className="album-img"
          />
          <p className="album-title">{ collectionName }</p>
          <p className="album-artist">{ artistName }</p>
        </Link>
      </div>
    );
  }
}

AlbumComp.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
  }).isRequired,
};
