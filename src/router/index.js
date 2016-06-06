import React, {Component, PropTypes} from 'react';
import {Router, Route} from 'react-router';

import App from '../containers/App/App.js';

export default class MyRouter extends Component {
  static propTypes = {
    history: PropTypes.object
  };

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={App} />
      </Router>
    );
  }
}
