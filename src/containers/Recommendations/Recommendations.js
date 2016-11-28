import React from 'react';
import {connect} from 'react-redux';

import {usersFetchAudios} from '../../actions/users';
import {playerPlayTrack, playerPlayPause} from '../../actions/player';

import {Audios} from '../Audios/Audios';

const Recommendations = props => <Audios {...props} />;

const mapStateToProps = ({player, entities}, ownProps) => {
	const ownerId = ownProps.params.ownerId;
	const entityId = `${ownerId}-recommendations`;
	const {ids, items, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		entityId,
		ids,
		items,
		fetching,
		error,
		offset,
		count,
		ownerId,
		activeAudioId: player.current,
		activeAudioOwnerId: (entities[player.entityId] || {}).ownerId,
		isAudioPlaying: player.isPlaying,
		isShuffling: player.isShuffling
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchAudios(params)),
	playTrack: params => dispatch(playerPlayTrack(params)),
	playPause: () => dispatch(playerPlayPause())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
