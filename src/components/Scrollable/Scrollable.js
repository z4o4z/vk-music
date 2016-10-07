import React, {Component, PropTypes} from 'react';

import classes from './scrollable.scss';

export default class Scrollable extends Component {
	static propTypes = {
		onScroll: PropTypes.func,
		children: PropTypes.element.isRequired
	};

	constructor(props) {
		super(props);

		this.onScroll = this.onScroll.bind(this);
	}

	render() {
		return (
			<div className={classes.component} ref="scrollable" onScroll={this.onScroll}>
				<div className={classes.content}>
					{this.props.children}
				</div>
			</div>
		);
	}

	shouldComponentUpdate(newProps) {
		return this.props.onScroll !== newProps.onScroll || this.props.children !== newProps.children;
	}

	onScroll() {
		if (!this.props.onScroll) {
			return;
		}

		const scrollable = this.refs.scrollable;

		this.props.onScroll(scrollable.scrollTop, scrollable.offsetHeight, scrollable.firstChild.offsetHeight);
	}
}
