import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {uiLeftMenuOpen} from '../../actions/ui';
import {authorization} from '../../actions/ouath';

import Header from '../../components/Header/Header';
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer';

import classes from './app.scss';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

class App extends Component {
  static propTypes = {
    leftMenuOpen: PropTypes.bool.isRequired,
    uiLeftMenuOpen: PropTypes.func.isRequired,
    authorization: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.authorization();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className={classes.app}>
          <Header onMenuClick={this.props.uiLeftMenuOpen} open={this.props.leftMenuOpen} />
          <LeftDrawer open={this.props.leftMenuOpen} topPosition={darkMuiTheme.appBar.height} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  leftMenuOpen: state.ui.leftMenuOpen
});

const mapDispatchToProps = dispatch => ({
  uiLeftMenuOpen: () => dispatch(uiLeftMenuOpen()),
  authorization: () => dispatch(authorization())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
