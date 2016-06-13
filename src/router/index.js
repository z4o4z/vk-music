import React, {Component, PropTypes} from 'react';
import {Router, Route} from 'react-router';

import App from '../containers/App/App';

export default class MyRouter extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    );
  }
}

