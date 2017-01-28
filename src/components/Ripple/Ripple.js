import React, {PureComponent} from 'react';

import classes from './ripple.scss';

export default class Ripple extends PureComponent {
	state = {
		ripples: [],
		width: 0,
		height: 0,
		top: 0,
		left: 0
	};

	render() {
		return (
			<div
				className={classes.component}
				onMouseDown={this.onMouseDown}
				onTouchStart={this.onMouseDown}
				ref={node => this.node = node}
			>
				{this.state.ripples.map(ripple => (
					<i className={classes.ripple} key={ripple.time} style={this.getStyle(ripple)} />
				))}
			</div>
		);
	}

	getStyle(ripple) {
		return {
			top: `${ripple.top}px`,
			left: `${ripple.left}px`,
			width: `${ripple.width}px`,
			height: `${ripple.height}px`
		};
	}

	getNewRippleData({clientY, clientX}) {
		const parrentsPos = this.node.getBoundingClientRect();

		const parrentsWidth = this.node.offsetWidth;
		const parrentsHeight = this.node.offsetHeight;

		const rippleWidthShouldBe = Math.max(parrentsHeight, parrentsWidth);

		const centerize = rippleWidthShouldBe / 2;

		return {
			width: rippleWidthShouldBe,
			height: rippleWidthShouldBe,
			top: clientY - parrentsPos.top - centerize,
			left: clientX - parrentsPos.left - centerize,
			time: Date.now()
		};
	}

	onMouseDown = e => {
		const dateNow = Date.now();

		const ripples = this.state.ripples.filter(ripple => dateNow <= ripple.time + 500);

		this.setState({
			ripples: [...ripples, this.getNewRippleData(e)]
		});
	};
}
