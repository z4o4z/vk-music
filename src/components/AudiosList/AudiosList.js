import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import {getGenreById} from '../../helpers/genres';

import LoaderHOC from '../../hoc/LoaderHOC/LoaderHOC';
import AudioItem from '../AudioItem/AudioItem';

class AudiosList extends Component {
	static propTypes = {
		ids: PropTypes.array.isRequired,
		audios: PropTypes.object.isRequired,
		pageSize: PropTypes.number.isRequired,
		activeAudioId: PropTypes.string,
		isAudioPlaying: PropTypes.bool.isRequired,
		onPlayClick: PropTypes.func.isRequired
	};

	render() {
		return (
			<div>
				{this.props.ids.map(this.renderItem)}
			</div>
		);
	}

	shouldComponentUpdate(newProps, nextState) {
		return shallowCompare(this, newProps, nextState);
	}

	renderItem = id => {
		const audio = this.props.audios[id];

		return (
			<AudioItem
				key={audio.cid}
				id={audio.cid}
				title={audio.title}
				artist={audio.artist}
				url={audio.url}
				genre={getGenreById(audio.genre)}
				onPlayClick={this.props.onPlayClick}
				isPlaying={this.props.isAudioPlaying && audio.cid === this.props.activeAudioId}
			/>
		);
	};
}

export default LoaderHOC('ids')(AudiosList);
