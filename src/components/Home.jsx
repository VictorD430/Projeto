import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';
import Header from './Header';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      logado: localStorage.getItem('user') !== null,
    };
  }

  render() {
    const { logado } = this.state;
    return (
      <>
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              { logado ? <Redirect to="/search" />
                : <Login handleSub={ () => { this.setState({ logado: true }); } } />}
            </Route>
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </main>
      </>
    );
  }
}
