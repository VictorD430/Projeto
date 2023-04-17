import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MyCheckbox extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.favoriteSong();
  }

  favoriteSong = async () => {
    const { song: { trackId } } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const checked = favoriteSongs
      ? favoriteSongs.some((song) => song.trackId === trackId)
      : false;
    this.setState({ checked });
    return checked;
  };

  handleClick = async (checked) => {
    const { song } = this.props;
    const remAdd = checked ? removeSong : addSong;
    this.setState({ loading: true });
    await remAdd(song);
    this.setState({ loading: false, checked: !checked });
  };

  render() {
    const { song: { trackId }, favoriteList } = this.props;
    const { checked, loading } = this.state;
    return (
      loading
        ? <Loading loading={ loading } />
        : (
          <label
            htmlFor={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorita
            <input
              type="checkbox"
              name="checkbox"
              checked={ checked }
              id={ `checkbox-music-${trackId}` }
              onChange={ () => {
                this.handleClick(checked);
                if (favoriteList) favoriteList();
              } }
            />
          </label>
        )
    );
  }
}

MyCheckbox.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    trackName: PropTypes.string,
    artist: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
  favoriteList: PropTypes.func,
};

MyCheckbox.defaultProps = {
  favoriteList: null,
};
