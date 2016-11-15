import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {AUDIOS_FETCH_COUNT} from '../../constants/audios';

import {usersFetchAudios} from '../../actions/users';
import {playerPlayTrack, playerPlayPause} from '../../actions/player';

import ScrollableFetchable from '../../components/ScrollableFetchable/ScrollableFetchable';
import AudiosList from '../../components/AudiosList/AudiosList';

class Audios extends Component {
	static propTypes = {
		items: PropTypes.array,
		fetching: PropTypes.bool,
		error: PropTypes.number,
		offset: PropTypes.number,
		count: PropTypes.number,
		activeAudioId: PropTypes.number,
		isAudioPlaying: PropTypes.bool.isRequired,
		userId: PropTypes.number.isRequired,
		albumId: PropTypes.number,
		fetch: PropTypes.func.isRequired,
		playTrack: PropTypes.func.isRequired,
		playPause: PropTypes.func.isRequired
	};

	render() {
		return (
			<ScrollableFetchable fetch={this.fetch} updateHeight={UI_SCROLL_UPDATE_HEIGHT} >
				{this.props.items ? <AudiosList
					audios={this.props.items}
					userId={this.props.userId}
					pageSize={AUDIOS_FETCH_COUNT}
					activeAudioId={this.props.activeAudioId}
					isAudioPlaying={this.props.isAudioPlaying}
					onPlayClick={this.onPlayClick}
				/> : <div></div>}
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

		this.props.fetch({
			offset: isOnInitialize ? 0 : this.props.offset,
			count: AUDIOS_FETCH_COUNT,
			userId: this.props.userId,
			albumId: this.props.albumId
		});
	};

	onPlayClick = id => {
		if (id === this.props.activeAudioId) {
			this.props.playPause();
		} else {
			this.props.playTrack({
				id: id,
				userId: this.props.userId
			});
		}
	};
}

const mapStateToProps = ({player, entities}, ownProps) => {
	const userId = Number(ownProps.params.userId);
	const albumId = Number(ownProps.params.albumId);
	const entityId = `${albumId || userId}-audios`;

	return ({
		...entities[entityId],
		userId: userId,
		albumId: albumId,
		activeAudioId: player.current,
		isAudioPlaying: player.playing
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchAudios(params)),
	playTrack: params => dispatch(playerPlayTrack(params)),
	playPause: () => dispatch(playerPlayPause())
});

export default connect(mapStateToProps, mapDispatchToProps)(Audios);
