import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import classes from './ripple.scss';

export default class Ripple extends Component {
	static propTypes = {
		cursorPos: PropTypes.object.isRequired
	};

	state = {
		animate: false,
		width: 0,
		height: 0,
		top: 0,
		left: 0
	};

	render() {
		return (
			<i className={this.getClassName()} ref="ripple" style={this.getStyle()}></i>
		);
	}

	componentWillReceiveProps(nextProps) {
		let cursorPos = nextProps.cursorPos;

		if (cursorPos.time === this.props.cursorPos.time) {
			return;
		}

		// If Has Animated, set state to "false" First
		if (this.state.animate) {
			this.setState({animate: false}, () => this.reppling(cursorPos));
		} else {
			this.reppling(cursorPos);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getStyle() {
		return {
			top: `${this.state.top}px`,
			left: `${this.state.left}px`,
			width: `${this.state.width}px`,
			height: `${this.state.height}px`
		};
	}

	getClassName() {
		return `${classes.ripple} ${this.state.animate ? classes.isReppling : ''}`;
	}

	reppling(cursorPos) {
		// Get the element
		let $ripple = this.refs.ripple;
		let $button = $ripple.parentElement;

		let buttonPos = $button.getBoundingClientRect();

		let buttonWidth = $button.offsetWidth;
		let buttonHeight = $button.offsetHeight;

		// Make a Square Ripple
		let rippleWidthShouldBe = Math.max(buttonHeight, buttonWidth);

		// Make Ripple Position to be center
		let centerize = rippleWidthShouldBe / 2;

		this.setState({
			animate: true,
			width: rippleWidthShouldBe,
			height: rippleWidthShouldBe,
			top: cursorPos.top - buttonPos.top - centerize,
			left: cursorPos.left - buttonPos.left - centerize
		});
	}
}
