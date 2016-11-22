import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ReactList from 'react-list';

import {getGenreById} from '../../helpers/genres';

import LoaderHOC from '../../hoc/LoaderHOC/LoaderHOC';
import AudioItem from '../AudioItem/AudioItem';

class AudiosList extends Component {
	static propTypes = {
		ids: PropTypes.array.isRequired,
		audios: PropTypes.object.isRequired,
		pageSize: PropTypes.number.isRequired,
		activeAudioId: PropTypes.number,
		activeAudioOwnerId: PropTypes.number,
		isAudioPlaying: PropTypes.bool.isRequired,
		onPlayClick: PropTypes.func.isRequired
	};

	render() {
		return (
			<ReactList
				itemRenderer={this.renderItem}
				length={this.props.ids.length}
				pageSize={this.props.pageSize}
				type="uniform"
				useStaticSize={true}
				useTranslate3d={true}
				activeAudioId={this.props.activeAudioId}
				activeAudioOwnerId={this.props.activeAudioId}
				isAudioPlaying={this.props.isAudioPlaying}
			/>
		);
	}

	shouldComponentUpdate(newProps, nextState) {
		return shallowCompare(this, newProps, nextState);
	}

	renderItem = (index, key) => {
		const audio = this.props.audios[this.props.ids[index]];

		return (
			<AudioItem
				key={key}
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
