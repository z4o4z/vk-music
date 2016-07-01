import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {uiLeftMenuOpen} from '../../actions/ui';
import {initialize} from '../../actions/initialize';
import {playerPlayPause, playerNext, playerPrev} from '../../actions/player';

import Header from '../../components/Header/Header';
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer';
import Loader from '../../components/Loader/Loader';
import Player from '../../components/Player/Player';

import classes from './app.scss';

class App extends Component {
  static propTypes = {
    leftMenuOpen: PropTypes.bool.isRequired,
    initialized: PropTypes.bool.isRequired,
    authorized: PropTypes.bool.isRequired,
    tokenExpire: PropTypes.number.isRequired,
    player: PropTypes.object.isRequired,
    audios: PropTypes.object.isRequired,
    uiLeftMenuOpen: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    playPlayPause: PropTypes.func.isRequired,
    playerNext: PropTypes.func.isRequired,
    playerPrev: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);

    this.props.initialize();
  }

  render() {
    return (
      <section className={classes.component}>
        <Header onMenuClick={this.props.uiLeftMenuOpen} open={this.props.leftMenuOpen}/>
        <LeftDrawer open={this.props.leftMenuOpen}/>
        {this.getContent()}
        {this.getPlayer()}
        {this.getLoader()}
      </section>
    );
  }

  getContent() {
    if (!this.isAppStarted()) {
      return null;
    }

    return (
      <main className={classes.content}>
        {this.props.children}
      </main>
    );
  }

  getAudio(id) {
    return this.props.audios[id] || {};
  }

  getPlayer() {
    if (!this.isAppStarted()) {
      return null;
    }

    return <Player
      playing={this.props.player.playing}
      audio={this.getAudio(this.props.player.current)}
      hasNext={Boolean(this.props.player.next)}
      hasPrev={Boolean(this.props.player.prev)}
      onPlay={this.props.playPlayPause}
      onNext={this.props.playerNext}
      onPrev={this.props.playerPrev}
    />;
  }

  getLoader() {
    if (this.isAppStarted()) {
      return null;
    }

    return <Loader />;
  }

  isAppStarted() {
    return this.props.initialized && this.props.authorized;
  }
}

const mapStateToProps = state => ({
  leftMenuOpen: state.ui.leftMenuOpen,
  initialized: state.initialized,
  authorized: state.authorize.authorized,
  tokenExpire: state.authorize.expire,
  player: state.player,
  audios: state.audio.all
});

const mapDispatchToProps = dispatch => ({
  uiLeftMenuOpen: () => dispatch(uiLeftMenuOpen()),
  initialize: () => dispatch(initialize()),
  playPlayPause: () => dispatch(playerPlayPause()),
  playerNext: () => dispatch(playerNext()),
  playerPrev: () => dispatch(playerPrev())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
