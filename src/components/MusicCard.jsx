import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyCheckbox from './MyCheckbox';

export default class MusicCard extends Component {
  render() {
    const {
      trackName,
      artist,
      artwork,
      favoriteList,
      trackId,
      previewUrl,
      pageFavorites,
    } = this.props;
    return (
      <div className="music-card">
        { pageFavorites
          ? (
            <img
              src={ artwork }
              alt={ `Capa do álbum de ${trackName}` }
              className="favorite-artwork"
            />
          ) : '' }
        <p className="song-name">{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <MyCheckbox
          song={ {
            trackName,
            artist,
            previewUrl,
            trackId,
            artwork,
          } }
          favoriteList={ favoriteList }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  artwork: PropTypes.string,
  artist: PropTypes.string,
  favoriteList: PropTypes.func,
  pageFavorites: PropTypes.bool,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  previewUrl: PropTypes.string.isRequired,
};

MusicCard.defaultProps = {
  artwork: undefined,
  artist: '',
  favoriteList: null,
  pageFavorites: false,
};
