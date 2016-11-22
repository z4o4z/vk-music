import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Scrollable from '../Scrollable/Scrollable';

export default class ScrollableFetchable extends Component {
	static propTypes = {
		fetch: PropTypes.func.isRequired,
		updateHeight: PropTypes.number.isRequired,
		scrollToTopIfChange: PropTypes.any.isRequired,
		children: PropTypes.element.isRequired
	};

	render() {
		return (
			<Scrollable onScroll={this.onScroll} ref={instance => this.scrollable = instance && instance.scrollable}>
				{this.props.children}
			</Scrollable>
		);
	}

	componentWillUpdate(prevProps) {
		if (prevProps.scrollToTopIfChange !== this.props.scrollToTopIfChange) {
			this.scrollable.scrollTop = 0;
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	onScroll = (scrollTop, height, childHeight) => {
		const updateHeight = childHeight - height - this.props.updateHeight;

		if (scrollTop >= updateHeight) {
			this.props.fetch();
		}
	}
}
