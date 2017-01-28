import React, {PropTypes} from 'react';

import LoaderHOC from '../../hoc/LoaderHOC/LoaderHOC';
import AudioItem from '../AudioItem/AudioItem';

function AudiosList(props) {
	return (
		<div>
			{props.ids.map(id => {
				const audio = props.audios[id];

				return (
					<AudioItem
						key={audio.cid}
						id={audio.cid}
						title={audio.title}
						artist={audio.artist}
						url={audio.url}
						onPlayClick={props.onPlayClick}
						isPlaying={props.isAudioPlaying && audio.cid === props.activeAudioId}
					/>
				);
			})}
		</div>
	);
}

AudiosList.propTypes = {
	ids: PropTypes.array.isRequired,
	audios: PropTypes.object.isRequired,
	pageSize: PropTypes.number.isRequired,
	activeAudioId: PropTypes.string,
	isAudioPlaying: PropTypes.bool.isRequired,
	onPlayClick: PropTypes.func.isRequired
};

export default LoaderHOC('ids')(AudiosList);
