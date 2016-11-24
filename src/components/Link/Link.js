import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cns from 'classnames';

import Ripple from '../Ripple/Ripple';

import classes from './link.scss';

export default class Link extends Component {
	static propTypes = {
		href: PropTypes.string.isRequired,
		children: PropTypes.any.isRequired,
		className: PropTypes.string,
		target: PropTypes.string,
		ripple: PropTypes.bool,
		onClick: PropTypes.func
	};

	static contextTypes = {
		router: PropTypes.object.isRequired
	};

	render() {
		return (
			<a
				className={cns(classes.component, this.props.className)}
				href={this.getHref(this.props.href)}
				target={this.props.target}
				onClick={this.props.onClick}
			>
				{this.props.ripple && <Ripple />}
				{this.props.children}
			</a>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getHref(href) {
		if (href.substr(0, 4) === 'http' || href.substr(0, 2) === '//') {
			return href;
		}

		return this.context.router.createHref(href);
	}
}
