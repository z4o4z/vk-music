import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';

import Ripple from './Ripple.js';

import classes from './ripple.scss';

export default class RippleButton extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string,
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

  shouldComponentUpdate(nextProps, nextState) {
    return !this.checkPropsAndState(nextProps, nextState);
  }

  getClassName() {
    let _classes = [classes.button];

    if (this.props.className) {
      _classes.push(this.props.className);
    }

    if (this.props.rounded) {
      _classes.push(classes.buttonRounded);
    }

    if (this.props.disabled) {
      _classes.push(classes.disabled);
    }

    return _classes.join(' ');
  }

  checkPropsAndState(nextProps, nextState) {
    const {children, onClick, rounded, disabled, className} = this.props;

    return children === nextProps.children &&
      onClick === nextProps.onClick &&
      rounded === nextProps.rounded &&
      className === nextProps.className &&
      disabled === nextProps.disabled &&
      nextState === this.state;
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
    if (this.props.href) {
      browserHistory.push(this.props.href);
    }

    if (this.props.onClick) {
      this.props.onClick();
    }
  }
}
