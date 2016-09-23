import React, {Component, PropTypes} from 'react';

import classes from './playerVisualization.scss';

const CHART_HEIGHT = 52;
const BAR_PADDING = 1;
const BAR_MIN_HEIGHT = CHART_HEIGHT / 255;
const BAR_GREEN_INIT_COLOR = 150;
const BAR_BLUE_INIT_COLOR = 136;
const BAR_GREEN_COLOR = 0.4117647058823529;
const BAR_BLUE_COLOR = 0.4666666666666667;

export default class PlayerVisualization extends Component {
	static propTypes = {
		playing: PropTypes.bool.isRequired,
		audioNode: PropTypes.node.isRequired
	};

	audioCtx = null;
	frequencyData = null;
	mediaElementSrc = null;
	analyser = null;

	constructor(props) {
		super(props);

		const Context = window.AudioContext || window.webkitAudioContext;

		if (!Context) {
			return;
		}

		this.audioCtx = new Context();
	}

	render() {
		return (
			<div className={classes.component}>
				<canvas className={classes.canvas} ref="canvas" />
			</div>
		);
	}

	componentDidMount() {
		if (!this.audioCtx) {
			return;
		}

		const canvas = this.refs.canvas;

		this.context = canvas.getContext('2d');
		this.mediaElementSrc = this.audioCtx.createMediaElementSource(this.props.audioNode);
		this.analyser = this.audioCtx.createAnalyser();

		this.mediaElementSrc.connect(this.analyser);
		this.mediaElementSrc.connect(this.audioCtx.destination);

		this.frequencyData = new Uint8Array(Math.floor(canvas.offsetWidth / 4));
		this.barWidth = Math.floor(canvas.offsetWidth / this.frequencyData.length) -
			(this.frequencyData.length - 1) * BAR_PADDING;
	}

	shouldComponentUpdate(nextProps) {
		return this.props.playing !== nextProps.playing || this.props.audioNode !== nextProps.audioNode;
	}

	componentDidUpdate() {
		if (!this.audioCtx) {
			return;
		}

		if (this.props.playing) {
			this.visualize();
		} else {
			this.stop();
		}
	}

	componentWillUnmount() {
		this.start();
	}

	getColor(i) {
		const green = Math.floor(BAR_GREEN_INIT_COLOR + i * BAR_GREEN_COLOR);
		const blue = Math.floor(BAR_BLUE_INIT_COLOR + i * BAR_BLUE_COLOR);

		return `rgb(${i}, ${green}, ${blue})`;
	}

	visualize() {
		this.analyser.getByteFrequencyData(this.frequencyData);

		this.context.lineWidth = this.barWidth;

		for (let i = 0; i < this.frequencyData.length; i++) {
			let x = i * this.barWidth + i * BAR_PADDING;
			let y = CHART_HEIGHT - i * BAR_MIN_HEIGHT;

			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, CHART_HEIGHT);
			this.context.strokeStyle = this.getColor(i);
			this.context.stroke();
		}

		this.raf = window.requestAnimationFrame(this.visualize);
	}

	stop() {
		if (this.raf) {
			window.cancelAnimationFrame(this.raf);
		}
	}
}
