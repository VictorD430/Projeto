import React, { Component } from 'react';
import { Route } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <main>
        <Route path="/" />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </main>
    );
  }
}
