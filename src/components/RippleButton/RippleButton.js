import React, {Component, PropTypes} from 'react';

import Ripple from './Ripple.js';

import classes from './ripple.scss';

export default class RippleButton extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    rounded: PropTypes.bool,
    children: PropTypes.element.isRequired
  };

  state = {
    cursorPos: {}
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  checkPropsAndState(nextProps, nextState) {
    const {children, onClick, rounded, className} = this.props;

    return children === nextProps.children &&
      onClick === nextProps.onClick &&
      rounded === nextProps.rounded &&
      className === nextProps.className &&
      nextState === this.state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.checkPropsAndState(nextProps, nextState);
  }

  onMouseDown(e) {
    this.setState({
      cursorPos: {
        top: e.clientY,
        left: e.clientX,
        time: Date.now()
      }
    });
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  getClassName() {
    return `${classes.button} ${this.props.className} ${this.props.rounded ? classes.buttonRounded : ''}`;
  }

  render() {
    return (
      <button className={this.getClassName()}
              ref="button"
              onMouseDown={this.onMouseDown}
              onTouchstart={this.onMouseDown}
              onClick={this.onClick}>
        {this.props.children}
        <Ripple cursorPos={this.state.cursorPos} />
      </button>
    );
  }
}
