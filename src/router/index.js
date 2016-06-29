import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from '../containers/App/App';
import MyAudios from '../containers/MyAudios/MyAudios';
import Friends from '../containers/Friends/Friends';

export default class MyRouter extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={App}>
          <IndexRoute component={MyAudios}/>
          <Route path="friends" component={Friends}/>
        </Route>
      </Router>
    );
  }
}

