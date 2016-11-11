import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {AUDIOS_FETCH_COUNT} from '../../constants/audios';

import {usersFetchAudios} from '../../actions/users';
import {playerPlayTrack, playerPlayPause} from '../../actions/player';

import ScrollableFetchable from '../../components/ScrollableFetchable/ScrollableFetchable';
import AudiosList from '../../components/AudiosList/AudiosList';

class UserAudios extends Component {
	static propTypes = {
		audios: PropTypes.object.isRequired,
		filterBy: PropTypes.array.isRequired,
		loading: PropTypes.bool.isRequired,
		error: PropTypes.number,
		offset: PropTypes.number.isRequired,
		audiosCount: PropTypes.number.isRequired,
		currentTrackId: PropTypes.number,
		isPlayerPlaying: PropTypes.bool.isRequired,
		userId: PropTypes.number.isRequired,
		albumId: PropTypes.number,
		fetchAudio: PropTypes.func.isRequired,
		playTrack: PropTypes.func.isRequired,
		playPause: PropTypes.func.isRequired
	};

	render() {
		return (
		<ScrollableFetchable fetch={this.fetch} updateHeight={UI_SCROLL_UPDATE_HEIGHT} >
			<AudiosList
				audios={this.props.audios}
				filterBy={this.props.filterBy}
				loading={this.props.loading}
				pageSize={AUDIOS_FETCH_COUNT}
				currentTrackId={this.props.currentTrackId}
				isPlayerPlaying={this.props.isPlayerPlaying}
				onPlayClick={this.onPlayClick}
			/>
		</ScrollableFetchable>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	fetch = () => {
		if (this.props.loading || (this.props.audiosCount && this.props.offset >= this.props.audiosCount)) {
			return;
		}

		this.props.fetchAudio({
			offset: this.props.offset,
			count: AUDIOS_FETCH_COUNT,
			userId: this.props.userId,
			albumId: this.props.userId
		});
	};

	onPlayClick = id => {
		if (id === this.props.currentTrackId) {
			this.props.playPause();
		} else {
			this.props.playTrack(id);
		}
	};
}

const mapStateToProps = ({audios, users, player}, ownProps) => {
	const userId = Number(ownProps.params.userId);
	const albumId = Number(ownProps.params.albumId);

	return ({
		audios,
		filterBy: users[userId].audios,
		userId: userId,
		albumId: albumId,
		offset: users[userId].audiosOffset,
		audiosCount: users[userId].audiosCount,
		loading: users[userId].audiosFetching,
		error: users[userId].audiosFetchError,
		currentTrackId: player.current,
		isPlayerPlaying: player.playing
	});
};

const mapDispatchToProps = dispatch => ({
	fetchAudio: params => dispatch(usersFetchAudios(params)),
	playTrack: id => dispatch(playerPlayTrack(id)),
	playPause: () => dispatch(playerPlayPause())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAudios);
