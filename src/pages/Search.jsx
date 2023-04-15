import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Album from '../components/AlbumComp';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      lastSearch: '',
      btnDisabled: true,
      loading: false,
      resultList: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minChar = 2;
    this.setState({
      [name]: value,
      btnDisabled: value.length < minChar,
      resultList: '',
    });
  };

  submit = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(search);
    this.setState({
      resultList: response, loading: false, lastSearch: search, search: '',
    });
  };

  render() {
    const {
      search,
      btnDisabled,
      loading,
      resultList,
      lastSearch,
    } = this.state;
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
        {resultList.length > 0
          ? (
            <div className="search-results">
              <div>
                Resultado de álbuns de:
                {` ${lastSearch}`}
              </div>
              <div>
                { resultList.map((result) => (
                  <Album key={ result.collectionId } album={ result } />
                ))}
              </div>
            </div>
          )
          : (<p>Nenhum álbum foi encontrado</p>
          )}
      </div>
    );
  }
}

export default Search;
