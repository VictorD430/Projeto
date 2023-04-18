import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ favorites, loading: false });
  };

  loadFavorites = () => {
    this.getFavorites();
  };

  render() {
    const { favorites, loading } = this.state;
    return (
      loading
        ? <Loading loading={ loading } />
        : (
          <div data-testid="page-favorites">
            <section className="favorite-list">
              { favorites.length
                ? favorites.map(
                  ({ artist, artwork, previewUrl, trackName, trackId }) => (
                    <MusicCard
                      pageFavorites
                      key={ trackId }
                      artist={ artist }
                      artwork={ artwork }
                      previewUrl={ previewUrl }
                      trackName={ trackName }
                      trackId={ trackId }
                      favoriteList={ this.loadFavorites }
                    />
                  ),
                )
                : (<span>Nenhum favorito.</span>) }
            </section>
          </div>
        )
    );
  }
}

export default Favorites;
