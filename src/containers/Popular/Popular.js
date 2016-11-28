import React from 'react';
import {connect} from 'react-redux';

import {usersFetchAudios} from '../../actions/users';
import {playerPlayTrack, playerPlayPause} from '../../actions/player';

import {Audios} from '../Audios/Audios';

const Popular = props => <Audios {...props} />;

const mapStateToProps = ({player, entities, audios}, ownProps) => {
	const ownerId = ownProps.params.ownerId;
	const entityId = `${ownerId}--recommendations`;
	const {ids, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		entityId,
		ids,
		fetching,
		error,
		offset,
		count,
		ownerId,
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

export default connect(mapStateToProps, mapDispatchToProps)(Popular);
