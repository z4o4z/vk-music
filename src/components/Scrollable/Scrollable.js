import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import classes from './scrollable.scss';

export default class Scrollable extends Component {
	static propTypes = {
		onScroll: PropTypes.func,
		children: PropTypes.element.isRequired
	};

	render() {
		return (
			<div className={classes.component} ref="scrollable" onScroll={this.onScroll}>
				<div className={classes.content}>
					{this.props.children}
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	onScroll = () => {
		if (!this.props.onScroll) {
			return;
		}

		const scrollable = this.refs.scrollable;

		this.props.onScroll(scrollable.scrollTop, scrollable.offsetHeight, scrollable.firstChild.offsetHeight);
	}
}
