import React, {PureComponent, PropTypes} from 'react';
import cns from 'classnames';

import Ripple from '../Ripple/Ripple';

import classes from './button.scss';

export default class Button extends PureComponent {
	static propTypes = {
		className: PropTypes.string,
		ripple: PropTypes.bool,
		rounded: PropTypes.bool,
		disabled: PropTypes.bool,
		children: PropTypes.element.isRequired,
		onClick: PropTypes.func
	};

	render() {
		return (
			<button className={this.getClassName()} onClick={this.props.onClick}>
				<i className={classes.hoverEffect} />

				{this.props.children}

				{this.props.ripple && <Ripple />}
			</button>
		);
	}

	getClassName() {
		return cns(classes.button, this.props.className, {
			[classes.buttonRounded]: this.props.rounded,
			[classes.disabled]: this.props.disabled
		});
	}
}
