import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {uiLeftMenuOpen, showLoader, hideLoader} from '../../actions/ui';
import {authorization} from '../../actions/ouath';

import Header from '../../components/Header/Header';
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer';
import Loader from '../../components/Loader/Loader';

import classes from './app.scss';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

class App extends Component {
  static propTypes = {
    leftMenuOpen: PropTypes.bool.isRequired,
    isShowLoader: PropTypes.bool.isRequired,
    oauth: PropTypes.object.isRequired,
    uiLeftMenuOpen: PropTypes.func.isRequired,
    hideLoader: PropTypes.func.isRequired,
    showLoader: PropTypes.func.isRequired,
    authorization: PropTypes.func.isRequired
  };

  isTokenValid() {
    const {token, initTime, expiresIn, state} = this.props.oauth;
    const now = Date.now();

    if (!token || state === 'authorizing') {
      return false;
    }

    return initTime + expiresIn - 3600000 > now;
  }

  componentWillMount() {
    if (!this.isTokenValid()) {
      this.props.authorization();
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className={classes.app}>
          <Header onMenuClick={this.props.uiLeftMenuOpen} open={this.props.leftMenuOpen} />
          <LeftDrawer open={this.props.leftMenuOpen} topPosition={darkMuiTheme.appBar.height} />
          <Loader show={this.props.isShowLoader} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  leftMenuOpen: state.ui.leftMenuOpen,
  isShowLoader: state.ui.showLoader,
  oauth: state.oauth
});

const mapDispatchToProps = dispatch => ({
  uiLeftMenuOpen: () => dispatch(uiLeftMenuOpen()),
  showLoader: () => dispatch(showLoader()),
  hideLoader: () => dispatch(hideLoader()),
  authorization: () => dispatch(authorization())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
