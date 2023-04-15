import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Loading extends Component {
  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <div className="loading">Carregando...</div>
      );
    }
    return '';
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
