import React from 'react';
import {connect} from 'react-redux';

import {usersFetchWall} from '../../actions/users';
import {playerPlayTrack, playerPlayPause} from '../../actions/player';

import {Audios} from '../Audios/Audios';

const Wall = props => <Audios {...props} />;

const mapStateToProps = ({player, entities, audios}, ownProps) => {
	const ownerId = ownProps.params.ownerId;
	const entityId = `${ownerId}--wall`;
	const {ids, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		entityId,
		ids,
		fetching,
		error,
		offset,
		count,
		ownerId,
		isLast: count && offset >= count,
		items: audios,
		activeAudioId: player.current,
		isAudioPlaying: player.isPlaying,
		isShuffling: player.isShuffling
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchWall(params)),
	playTrack: params => dispatch(playerPlayTrack(params)),
	playPause: () => dispatch(playerPlayPause())
});

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
