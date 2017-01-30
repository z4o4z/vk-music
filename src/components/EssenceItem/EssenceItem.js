import React, {PureComponent, PropTypes} from 'react';

import Ripple from '../Ripple/Ripple';
import Link from '../Link/Link';

import classes from './essenceItem.scss';

export default class EssenceItem extends PureComponent {
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
						<div className={classes.bottom}>
							{this.getLinks()}
						</div>
					</div>
				</div>
			</div>
		);
	}

	getLinks() {
		return this.props.links.map((link, index) =>
			<div data-tip={link.title} key={index}>
				<Link
					className={classes.link}
					href={link.href}
					target={link.blank ? '_blank' : ''}
					ripple={true}
					onClick={this.onLinkClick}
				>
					{link.icon}
				</Link>
			</div>
		);
	}

	onClick = () => {
		this.context.router.push(this.props.url);
	};

	onLinkClick = e => e.stopPropagation();
}
