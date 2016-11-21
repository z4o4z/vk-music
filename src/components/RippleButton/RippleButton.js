import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

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

	static contextTypes = {
		router: PropTypes.object.isRequired
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
							onTouchStart={this.onMouseDown}
							onClick={this.onClick}>
				<i className={classes.hoverEffect} />
				{this.props.children}
				<Ripple cursorPos={this.state.cursorPos} />
			</button>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
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
		let stopPreventDefault;

		if (this.props.onClick) {
			stopPreventDefault = this.props.onClick();
		}

		if (!stopPreventDefault && this.props.href) {
			this.context.router.push(this.props.href);
		}
	}
}
