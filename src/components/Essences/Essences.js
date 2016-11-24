import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import ScrollableFetchable from '../ScrollableFetchable/ScrollableFetchable';
import EssencesList from '../EssencesList/EssencesList';

export default class Essences extends Component {
	static propTypes = {
		ids: PropTypes.array,
		items: PropTypes.object,
		fetching: PropTypes.bool,
		error: PropTypes.number,
		offset: PropTypes.number,
		count: PropTypes.number,
		userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		updateHeight: PropTypes.number.isRequired,
		fetchCount: PropTypes.number.isRequired,
		getItemProps: PropTypes.func.isRequired,
		fetch: PropTypes.func.isRequired
	};

	componentWillMount() {
		this.fetch(true);
	}

	render() {
		return (
			<ScrollableFetchable
				fetch={this.fetch}
				updateHeight={this.props.updateHeight}
				scrollToTopIfChange={this.props.userId}
			>
				<EssencesList
					ids={this.props.ids}
					essences={this.props.items}
					pageSize={this.props.fetchCount}
					userId={this.props.userId}
					getItemProps={this.props.getItemProps}
				/>
			</ScrollableFetchable>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	componentDidUpdate(oldProps) {
		if (this.props.userId !== oldProps.userId) {
			this.fetch(true);
		}
	}

	fetch = isOnInitialize => {
		if (this.props.fetching || (this.props.count && this.props.offset >= this.props.count)) {
			return;
		}

		this.props.fetch({
			offset: isOnInitialize ? 0 : this.props.offset,
			count: this.props.fetchCount,
			userId: this.props.userId
		});
	};
}
