import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName() {
    getUser().then(({ name }) => {
      this.setState({ user: name, loading: false });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component" className="header-component">
        <Link
          to="/search"
          data-testid="link-to-search"
          className="link-search"
        >
          Pesquisa
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
          className="link-favorites"
        >
          Favoritas
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
          className="link-profile"
        >
          Perfil
        </Link>
        <div data-testid="header-user-name" className="header-user">
          { loading ? <Loading loading={ loading } />
            : (
              <span className="user-name">{ user }</span>
            )}
        </div>
      </header>
    );
  }
}
