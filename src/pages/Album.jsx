import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      artwork: '',
      title: '',
      tracks: [],
    };
  }

  componentDidMount() {
    this.getMusicDescription();
  }

  async getMusicDescription() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const musics = response.reduce((acc, current) => {
      const { collectionName, previewUrl, trackId, trackName, kind } = current;
      if (kind === 'song') {
        acc.push({ collectionName, previewUrl, trackId, trackName });
      }
      return acc;
    }, []);
    const music = response[0];
    const { artistName, artworkUrl100, collectionName } = music;
    this.setState({
      artist: artistName,
      artwork: artworkUrl100,
      title: collectionName,
      tracks: musics,
    });
  }

  render() {
    const { artist, artwork, title, tracks } = this.state;
    return (
      <div data-testid="page-album" className="page-album">
        <div>
          <img src={ artwork } alt={ `Capa do álbum ${title}` } />
          <section className="album-description">
            <p data-testid="album-name" className="album-name">{ title }</p>
            <p data-testid="artist-name" className="artist-name">{ artist }</p>
          </section>
        </div>
        <div className="tracks-list">
          { tracks.map(({ trackId, trackName, previewUrl }) => (
            <MusicCard
              key={ trackId }
              artist={ artist }
              artwork={ artwork }
              trackId={ trackId }
              trackName={ trackName }
              previewUrl={ previewUrl }
            />
          ))}
        </div>
      </div>
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

export default Album;
