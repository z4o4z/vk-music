import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {Link} from 'react-router';

import RippleButton from '../RippleButton/RippleButton';

import classes from './essenceItem.scss';

export default class FriendsAndGroupsItem extends Component {
	static propTypes = {
		url: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		photo: PropTypes.string.isRequired,
		links: PropTypes.array.isRequired
	};

	render() {
		return (
			<RippleButton className={classes.component} href={this.props.url} >
				<div className={classes.content}>
					<img className={classes.photo} src={this.props.photo} alt=""/>
					<div className={classes.wrapper}>
						<span className={classes.name} >{this.props.name}</span>
						<div>
							{this.getLinks()}
						</div>
					</div>
				</div>
			</RippleButton>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getLinks() {
		return this.props.links.map((link, index) =>
			<Link
				className={classes.link}
				to={link.to}
				target={link.blank ? '_blank' : ''}
				key={index}
				onClick={this.onClick}
			>
				{link.name}
			</Link>
		);
	}

	onClick(e) {
		e.stopPropagation();
	}
}
