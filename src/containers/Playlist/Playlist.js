import React from 'react';
import {connect} from 'react-redux';

import {playerPlayTrack, playerPlayPause, playerFetchPlaylist} from '../../actions/player';

import {Audios} from '../Audios/Audios';

const Playlist = props => <Audios {...props} />;

const mapStateToProps = ({player, entities}) => {
	const {entityId, playlist, error, offset, count, fetching} = player;
	const {items, userId, albumId} = entities[player.entityId] || {};

	return ({
		entityId,
		items,
		error,
		offset,
		count,
		userId,
		albumId,
		fetching,
		ids: playlist,
		activeAudioId: player.current,
		activeAudioOwnerId: userId,
		isShuffling: player.isShuffling,
		isAudioPlaying: player.isPlaying
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(playerFetchPlaylist(params)),
	playTrack: params => dispatch(playerPlayTrack(params)),
	playPause: () => dispatch(playerPlayPause())
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
