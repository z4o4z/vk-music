import React, {PureComponent, PropTypes} from 'react';

import Scrollable from '../Scrollable/Scrollable';

export default class ScrollableFetchable extends PureComponent {
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

	onScroll = (scrollTop, height, childHeight) => {
		const updateHeight = childHeight - height - this.props.updateHeight;

		if (scrollTop >= updateHeight) {
			this.props.fetch();
		}
	}
}
