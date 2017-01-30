import React, {PropTypes} from 'react';
import cns from 'classnames';

import PlayPauseButton from '../PlayPauseButton/PlayPauseButton';
import AudioInfo from '../AudioInfo/AudioInfo';

import classes from './audioItem.scss';

export default function AudioItem(props) {
	const clsName = cns(classes.content, {[classes.active]: props.isPlaying, [classes.disable]: !props.url});
	const onPlay = () => props.url && props.onPlayClick(props.id);

	return (
		<div className={classes.component} onClick={onPlay}>
			<div className={clsName}>
				<PlayPauseButton isPlaying={props.isPlaying} disabled={!props.url} />

				<AudioInfo title={props.title} artist={props.artist} />
			</div>
		</div>
	);
}

AudioItem.propTypes = {
	id: PropTypes.string.isRequired,
	url: PropTypes.string,
	title: PropTypes.string.isRequired,
	artist: PropTypes.string.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	onPlayClick: PropTypes.func.isRequired
};
