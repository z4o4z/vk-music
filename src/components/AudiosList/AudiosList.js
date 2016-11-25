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
		activeAudioId: PropTypes.number,
		activeAudioOwnerId: PropTypes.string,
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
				key={audio.id}
				id={audio.id}
				title={audio.title}
				artist={audio.artist}
				genre={getGenreById(audio.genre)}
				onPlayClick={this.props.onPlayClick}
				isPlaying={this.isAudioPlying(audio)}
			/>
		);
	};

	isAudioPlying(audio) {
		return this.props.isAudioPlaying &&
			audio.id === this.props.activeAudioId &&
			audio.owner_id === this.props.activeAudioOwnerId;
	}
}

export default LoaderHOC('ids')(AudiosList);
