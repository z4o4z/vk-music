import React from 'react';
import {connect} from 'react-redux';

import {playerPlayTrack, playerPlayPause, playerFetchPlaylist} from '../../actions/player';

import {Audios} from '../Audios/Audios';

const Playlist = props => <Audios {...props} withoutInitFetch={true} withoutShuffleOnPlay={true} />;

const mapStateToProps = ({player, entities, audios}) => {
	const {entityId, playlist, error, offset, count, fetching} = player;
	const {ownerId, albumId} = entities[player.entityId] || {};

	return ({
		entityId,
		error,
		offset,
		count,
		ownerId,
		albumId,
		fetching,
		isLast: count && offset >= count,
		ids: playlist,
		items: audios,
		activeAudioId: player.current,
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
