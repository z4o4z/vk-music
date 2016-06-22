import React, {Component, PropTypes} from 'react';

import PlayArrow from 'react-icons/lib/md/play-arrow';

import RippleButton from '../RippleButton/RippleButton';

import classes from './audioItem.scss';

const PlayArrowIcon = <PlayArrow size={24} color="white"/>;

export default class AudioItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    genre: PropTypes.string
  };

  checkProps(nextProps) {
    const {title, artist, genre} = this.props;

    return title === nextProps.title && artist === nextProps.artist && genre === nextProps.genre;
  }

  shouldComponentUpdate(nextProps) {
    return !this.checkProps(nextProps);
  }

  render() {
    return (
      <div className={classes.component}>
        <RippleButton rounded={true} className={classes.button}>
          {PlayArrowIcon}
        </RippleButton>
        <div className={classes.info}>
          <span className={classes.title}>{this.props.title}</span>
          <div className={classes.infoFooter}>
            <span className={classes.artist}>{this.props.artist}</span>
            <span className={classes.genre}>{this.props.genre}</span>
          </div>
        </div>
      </div>
    );
  }
}
