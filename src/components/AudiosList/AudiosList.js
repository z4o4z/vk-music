import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ReactList from 'react-list';

import {getGenreById} from '../../helpers/genres';

import AudioItem from '../AudioItem/AudioItem';

export default class AudiosList extends Component {
	static propTypes = {
		audios: PropTypes.array.isRequired,
		userId: PropTypes.number.isRequired,
		pageSize: PropTypes.number.isRequired,
		activeAudioId: PropTypes.number,
		isAudioPlaying: PropTypes.bool.isRequired,
		onPlayClick: PropTypes.func.isRequired
	};

	render() {
		return (
			<ReactList
				itemRenderer={this.renderItem}
				length={this.props.audios.length}
				pageSize={this.props.pageSize}
				type="uniform"
				useStaticSize={true}
				useTranslate3d={true}
				activeAudioId={this.props.activeAudioId}
				isAudioPlaying={this.props.isAudioPlaying}
			/>
		);
	}

	shouldComponentUpdate(newProps, nextState) {
		return shallowCompare(this, newProps, nextState);
	}

	renderItem = (index, key) => {
		const audio = this.props.audios[index];

		return (
			<AudioItem
				key={key}
				id={audio.id}
				title={audio.title}
				artist={audio.artist}
				genre={getGenreById(audio.genre)}
				onPlayClick={this.props.onPlayClick}
				playing={this.isAudioPlying(audio)}
			/>
		);
	};

	isAudioPlying(audio) {
		return this.props.isAudioPlaying && audio.id === this.props.activeAudioId && audio.owner_id === this.props.userId;
	}
}

