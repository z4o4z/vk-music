import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {AUDIOS_FETCH_COUNT} from '../../constants/general';

import shuffleAndSetFirst from '../../helpers/shuffleAndSetFirst';

import {usersFetchAudios} from '../../actions/users';
import {playerPlayTrack, playerPlayPause} from '../../actions/player';

import ScrollableFetchable from '../../components/ScrollableFetchable/ScrollableFetchable';
import AudiosList from '../../components/AudiosList/AudiosList';

export class Audios extends Component {
	static propTypes = {
		ids: PropTypes.array,
		items: PropTypes.object,
		fetching: PropTypes.bool,
		error: PropTypes.number,
		offset: PropTypes.number,
		count: PropTypes.number,
		entityId: PropTypes.string,
		activeAudioId: PropTypes.string,
		isAudioPlaying: PropTypes.bool.isRequired,
		ownerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		albumId: PropTypes.number,
		withoutInitFetch: PropTypes.bool,
		withoutShuffleOnPlay: PropTypes.bool,
		isShuffling: PropTypes.bool.isRequired,
		fetch: PropTypes.func.isRequired,
		playTrack: PropTypes.func.isRequired,
		playPause: PropTypes.func.isRequired
	};

	componentWillMount() {
		this.fetch(true);
	}

	render() {
		return (
			<ScrollableFetchable
				fetch={this.fetch}
				updateHeight={UI_SCROLL_UPDATE_HEIGHT}
				scrollToTopIfChange={this.props.ownerId}
			>
				<AudiosList
					ids={this.props.ids}
					audios={this.props.items}
					pageSize={AUDIOS_FETCH_COUNT}
					activeAudioId={this.props.activeAudioId}
					isAudioPlaying={this.props.isAudioPlaying}
					onPlayClick={this.onPlayClick}
				/>
			</ScrollableFetchable>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	fetch = isOnInitialize => {
		if (this.props.fetching || (this.props.count && this.props.offset >= this.props.count)) {
			return;
		}

		if (isOnInitialize && this.props.withoutInitFetch) {
			return;
		}

		this.props.fetch({
			entityId: this.props.entityId,
			offset: isOnInitialize ? 0 : this.props.offset,
			count: AUDIOS_FETCH_COUNT,
			ownerId: this.props.ownerId,
			albumId: this.props.albumId
		});
	};

	onPlayClick = id => {
		const makeShuffle = this.props.isShuffling && !this.props.withoutShuffleOnPlay;

		if (id === this.props.activeAudioId) {
			this.props.playPause();
		} else {
			this.props.playTrack({
				id: id,
				playlist: makeShuffle ? shuffleAndSetFirst([...this.props.ids], id) : this.props.ids,
				entityId: this.props.entityId,
				offset: this.props.offset,
				count: this.props.count
			});
		}
	};
}

const mapStateToProps = ({player, entities, audios}, ownProps) => {
	const ownerId = ownProps.params.ownerId;
	const albumId = Number(ownProps.params.albumId);
	const entityId = `${albumId || ownerId}--audios`;
	const {ids, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		entityId,
		ids,
		fetching,
		error,
		offset,
		count,
		ownerId,
		albumId,
		items: audios,
		activeAudioId: player.current,
		isAudioPlaying: player.isPlaying,
		isShuffling: player.isShuffling
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchAudios(params)),
	playTrack: params => dispatch(playerPlayTrack(params)),
	playPause: () => dispatch(playerPlayPause())
});

export default connect(mapStateToProps, mapDispatchToProps)(Audios);
