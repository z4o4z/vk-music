import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Scrollable from '../Scrollable/Scrollable';

export default class ScrollableFetchable extends Component {
	static propTypes = {
		fetch: PropTypes.func.isRequired,
		updateHeight: PropTypes.number.isRequired,
		children: PropTypes.element.isRequired
	};

	componentWillMount() {
		this.props.fetch(true);
	}

	render() {
		return (
			<Scrollable onScroll={this.onScroll}>
				{this.props.children}
			</Scrollable>
		);
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
