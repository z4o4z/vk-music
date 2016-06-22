import React, {Component, PropTypes} from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/Play-Arrow';

import classes from './audioItem.scss';

export default class AudioItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    genre: PropTypes.string
  };

  render() {
    return (
      <div className={classes.component}>
        <FloatingActionButton mini={true} zDepth={1}>
          <PlayArrow/>
        </FloatingActionButton>
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
