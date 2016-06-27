import React, {Component, PropTypes} from 'react';
import {select} from 'd3';

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
    audioFile: PropTypes.string,
    playing: PropTypes.bool.isRequired,
    onEnded: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
  };

  withoutVisualisation = false;
  audioCtx = null;
  frequencyData = null;
  audioSrc = null;
  analyser = null;
  graph = null;

  constructor(props) {
    super(props);

    const Context = window.AudioContext || window.webkitAudioContext;

    if (!Context) {
      this.withoutVisualisation = true;

      return;
    }

    this.audioCtx = new Context();
    this.renderChart = this.renderChart.bind(this);
  }

  render() {
    return (
      <div className={classes.component}>
        <audio src={this.getProxyUrl(this.props.audioFile)} ref="audio" onEnded={this.props.onEnded}/>
        <div className={classes.graph} ref="graph"></div>
        {this.props.children}
      </div>
    );
  }

  componentDidMount() {
    if (this.withoutVisualisation) {
      return;
    }

    this.audioSrc = this.audioCtx.createMediaElementSource(this.refs.audio);
    this.analyser = this.audioCtx.createAnalyser();

    this.audioSrc.connect(this.analyser);
    this.audioSrc.connect(this.audioCtx.destination);

    const graph = this.refs.graph;
    const graphWidth = graph.offsetWidth;

    this.graph = this.createSvg(graph, CHART_HEIGHT);

    this.frequencyData = new Uint8Array(Math.floor(graphWidth / 4));

    this.createBars(this.frequencyData, graphWidth, BAR_PADDING);
  }

  componentDidUpdate() {
    if (this.props.playing) {
      this.refs.audio.play();
      this.renderChart();
    } else {
      this.refs.audio.pause();
      this.cancelRAF();
    }
  }

  componentWillUnmount() {
    this.cancelRAF();
  }

  getProxyUrl(url) {
    let urlArr = url.split('/');
    urlArr[0] = 'http:';
    urlArr.splice(2, 0, window.location.host, 'audio-proxy');

    return urlArr.join('/');
  }

  createSvg(parent, height) {
    return select(parent)
      .append('svg')
      .attr('height', height)
      .attr('width', '100%');
  }

  createBars(frequencyData, parentWidth, padding) {
    this.graph.selectAll('rect')
      .data(frequencyData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (parentWidth / frequencyData.length))
      .attr('width', parentWidth / frequencyData.length - padding);
  }

  getColor(d) {
    const green = Math.floor(BAR_GREEN_INIT_COLOR + d * BAR_GREEN_COLOR);
    const blue = Math.floor(BAR_BLUE_INIT_COLOR + d * BAR_BLUE_COLOR);

    return `rgb(${d}, ${green}, ${blue})`;
  }

  renderChart() {
    this.analyser.getByteFrequencyData(this.frequencyData);

    this.graph.selectAll('rect')
      .data(this.frequencyData)
      .attr('y', d => CHART_HEIGHT - d * BAR_MIN_HEIGHT)
      .attr('height', d => d * BAR_MIN_HEIGHT)
      .attr('fill', this.getColor);

    this.raf = window.requestAnimationFrame(this.renderChart);
  }

  cancelRAF() {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
  }
}
