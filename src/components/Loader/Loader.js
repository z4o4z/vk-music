import React, {Component, PropTypes} from 'react';

import classes from './loader.scss';

export default class Loader extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div className={`${classes.loader} ${this.props.show ? classes.show : ''}`}>
        <div className={classes.wrapper}>
          <svg className={classes.spinner} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle className={classes.circle} fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" />
          </svg>
        </div>
      </div>
    );
  }
}
