import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {ALBUMS_FETCH_COUNT} from '../../constants/albums';

import {usersFetchAlbums} from '../../actions/users';

import ScrollableFetchable from '../../components/ScrollableFetchable/ScrollableFetchable';
import EssencesList from '../../components/EssencesList/EssencesList';

import albumsLogo from './album.svg';

class Albums extends Component {
	static propTypes = {
		ids: PropTypes.array,
		items: PropTypes.object,
		fetching: PropTypes.bool,
		error: PropTypes.number,
		offset: PropTypes.number,
		count: PropTypes.number,
		userId: PropTypes.number.isRequired,
		fetch: PropTypes.func.isRequired
	};

	componentWillMount() {
		this.fetch(true);
	}

	render() {
		return (
			<ScrollableFetchable
				fetch={this.fetch}
				updateHeight={UI_SCROLL_UPDATE_HEIGHT}
				scrollToTopIfChange={this.props.userId}
			>
				<EssencesList
					ids={this.props.ids}
					essences={this.props.items}
					pageSize={ALBUMS_FETCH_COUNT}
					userId={this.props.userId}
					getItemProps={this.getItemProps}
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
			count: ALBUMS_FETCH_COUNT,
			userId: this.props.userId
		});
	};

	getItemProps = (key, item) => {
		return {
			key,
			url: `/${this.props.userId}/albums/${item.id}`,
			name: item.title,
			photo: albumsLogo,
			links: [{
				to: `//vk.com/audios${this.props.userId}?album_id=${item.id}`,
				blank: true,
				name: 'Открыть в VK'
			}]
		};
	}
}

const mapStateToProps = ({entities}, ownProps) => {
	const userId = Number(ownProps.params.userId);
	const entityId = `${userId}-albums`;
	const {ids, items, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		ids,
		items,
		fetching,
		error,
		offset,
		count,
		userId: userId
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchAlbums(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
