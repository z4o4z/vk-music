import React, {PropTypes} from 'react';
import cns from 'classnames';

import classes from './audioInfo.scss';

export default function AudioInfo(props) {
	return (
		<div className={cns(classes.component, {[classes.componentPlayer]: props.playerStyle})} >
			<span className={classes.title}>{props.title}</span>
			<div className={classes.infoFooter}>
				<span className={classes.artist}>{props.artist}</span>
			</div>
		</div>
	);
}

AudioInfo.propTypes = {
	title: PropTypes.string.isRequired,
	artist: PropTypes.string.isRequired,
	playerStyle: PropTypes.bool
};
