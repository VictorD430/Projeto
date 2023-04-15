import React, { Component } from 'react';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      btnDisabled: true,
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minChar = 2;
    this.setState({
      [name]: value,
      btnDisabled: value.length < minChar,
    });
  };

  render() {
    const { search, btnDisabled, loading } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <section className="search-container">
            <input
              data-testid="search-artist-input"
              className="search-artist-input"
              type="text"
              placeholder="Nome do Artista"
              name="search"
              value={ search }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              onClick={ this.submit }
              data-testid="search-artist-button"
              disabled={ btnDisabled }
            >
              Pesquisar
            </button>
          </section>
        </form>
        <Loading loading={ loading } />
      </div>
    );
  }
}

export default Search;
