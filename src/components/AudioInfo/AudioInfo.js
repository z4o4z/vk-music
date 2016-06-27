import React, {Component, PropTypes} from 'react';

import classes from './audioInfo.scss';

export default class AudioItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    genre: PropTypes.string
  };

  render() {
    return (
      <div className={classes.component}>
        <span className={classes.title}>{this.props.title}</span>
        <div className={classes.infoFooter}>
          <span className={classes.artist}>{this.props.artist}</span>
          <span className={classes.genre}>{this.props.genre}</span>
        </div>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    return !this.checkProps(nextProps);
  }

  checkProps(nextProps) {
    const {title, artist, genre} = this.props;

    return title === nextProps.title && artist === nextProps.artist && genre === nextProps.genre;
  }
}
