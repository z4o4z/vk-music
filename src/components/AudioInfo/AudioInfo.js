import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cns from 'classnames';

import classes from './audioInfo.scss';

export default class AudioInfo extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		playerStyle: PropTypes.bool
	};

	render() {
		return (
			<div className={cns(classes.component, {[classes.componentPlayer]: this.props.playerStyle})} >
				<span className={classes.title}>{this.props.title}</span>
				<div className={classes.infoFooter}>
					<span className={classes.artist}>{this.props.artist}</span>
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
}
