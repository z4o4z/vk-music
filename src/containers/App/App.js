import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {uiLeftMenuOpen, showLoader, hideLoader} from '../../actions/ui';
import {initAndAuth} from '../../actions/vk';

import Header from '../../components/Header/Header';
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer';
import Loader from '../../components/Loader/Loader';
import Player from '../../components/Player/Player';

import classes from './app.scss';

class App extends Component {
  static propTypes = {
    leftMenuOpen: PropTypes.bool.isRequired,
    isShowLoader: PropTypes.bool.isRequired,
    uiLeftMenuOpen: PropTypes.func.isRequired,
    hideLoader: PropTypes.func.isRequired,
    showLoader: PropTypes.func.isRequired,
    isVKInitialized: PropTypes.bool.isRequired,
    isVKAuthorized: PropTypes.bool.isRequired,
    VKAuthExpire: PropTypes.number.isRequired,
    initAndAuthVk: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    audios: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  componentWillMount() {
    if (!this.props.isVKInitialized) {
      this.props.initAndAuthVk(this.props.VKAuthExpire);
    }
  }

  isAppStarted() {
    return this.props.isVKInitialized && this.props.isVKAuthorized;
  }

  getLoader() {
    if (this.isAppStarted()) {
      return null;
    }

    return <Loader />;
  }

  getContent() {
    if (!this.isAppStarted()) {
      return null;
    }

    return (
      <main className={`${classes.contentWrapper} ${this.props.leftMenuOpen ? classes.contentWrapperWithPadding : ''}`}>
        <div className={classes.content}>
          {this.props.children}
        </div>
      </main>
    );
  }

  getAudioUrl(id) {
    return this.props.audios[id].url;
  }

  getPlayer() {
    if (!this.isAppStarted() || !this.props.audios || !this.props.player.current) {
      return null;
    }

    return <Player playing={this.props.player.playing} audioFile={this.getAudioUrl(this.props.player.current)}/>;
  }

  render() {
    return (
      <section className={classes.component}>
        <Header onMenuClick={this.props.uiLeftMenuOpen} open={this.props.leftMenuOpen}/>
        <LeftDrawer open={this.props.leftMenuOpen}/>
        {this.getContent()}
        {this.getLoader()}
        {this.getPlayer()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  leftMenuOpen: state.ui.leftMenuOpen,
  isShowLoader: state.ui.showLoader,
  isVKInitialized: state.vk.initialized,
  isVKAuthorized: state.vk.authorized,
  VKAuthExpire: state.vk.expire,
  player: state.player,
  audios: state.audio.all
});

const mapDispatchToProps = dispatch => ({
  uiLeftMenuOpen: () => dispatch(uiLeftMenuOpen()),
  showLoader: () => dispatch(showLoader()),
  hideLoader: () => dispatch(hideLoader()),
  initAndAuthVk: expire => dispatch(initAndAuth(expire))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
