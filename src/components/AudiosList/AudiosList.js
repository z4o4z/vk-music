import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ReactList from 'react-list';

import {getGenreById} from '../../helpers/genres';

import AudioItem from '../AudioItem/AudioItem';

export default class AudiosList extends Component {
	static propTypes = {
		audios: PropTypes.object.isRequired,
		filterBy: PropTypes.array.isRequired,
		pageSize: PropTypes.number.isRequired,
		currentTrackId: PropTypes.number,
		isPlayerPlaying: PropTypes.bool.isRequired,
		onPlayClick: PropTypes.func.isRequired
	};

	render() {
		return (
			<ReactList
				itemRenderer={this.renderItem}
				length={this.props.filterBy.length}
				pageSize={this.props.pageSize}
				type="uniform"
				useStaticSize={true}
				useTranslate3d={true}
				currentTrackId={this.props.currentTrackId}
				isPlayerPlaying={this.props.isPlayerPlaying}
			/>
		);
	}

	shouldComponentUpdate(newProps, nextState) {
		return shallowCompare(this, newProps, nextState);
	}

	renderItem = (index, key) => {
		const audio = this.props.audios[this.props.filterBy[index]];

		return (
			<AudioItem
				key={key}
				id={audio.id}
				title={audio.title}
				artist={audio.artist}
				genre={getGenreById(audio.genre)}
				onPlayClick={this.props.onPlayClick}
				playing={this.props.isPlayerPlaying && audio.id === this.props.currentTrackId}
			/>
		);
	};
}

