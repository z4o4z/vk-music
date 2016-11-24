import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Ripple from '../Ripple/Ripple';
import Link from '../Link/Link';

import classes from './essenceItem.scss';

export default class EssenceItem extends Component {
	static propTypes = {
		url: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		photo: PropTypes.string.isRequired,
		links: PropTypes.array.isRequired
	};

	static contextTypes = {
		router: PropTypes.object.isRequired
	};

	render() {
		return (
			<div className={classes.component} onClick={this.onClick} >
				<div className={classes.content}>
					<Ripple />
					<img className={classes.photo} src={this.props.photo} alt=""/>
					<div className={classes.wrapper}>
						<span className={classes.name} >{this.props.name}</span>
						<div>
							{this.getLinks()}
						</div>
					</div>
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getLinks() {
		return this.props.links.map((link, index) =>
			<Link
				className={classes.link}
				href={link.href}
				target={link.blank ? '_blank' : ''}
				key={index}
				onClick={this.onLinkClick}
			>
				{link.name}
			</Link>
		);
	}

	onClick = () => {
		this.context.router.push(this.props.url);
	};

	onLinkClick = e => e.stopPropagation();
}
