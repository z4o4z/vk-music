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
		ownerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
				scrollToTopIfChange={this.props.ownerId}
			>
				<EssencesList
					ids={this.props.ids}
					essences={this.props.items}
					pageSize={this.props.fetchCount}
					ownerId={this.props.ownerId}
					getItemProps={this.props.getItemProps}
				/>
			</ScrollableFetchable>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	componentDidUpdate(oldProps) {
		if (this.props.ownerId !== oldProps.ownerId) {
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
			ownerId: this.props.ownerId
		});
	};
}
