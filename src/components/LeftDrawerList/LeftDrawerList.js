import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Link from '../Link/Link';

import classes from './leftDrawerList.scss';

export default class LeftDrawerList extends Component {
	static propTypes = {
		items: PropTypes.array.isRequired
	};

	render() {
		return (
			<ul className={classes.list}>
				{this.getItems()}
			</ul>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getItems() {
		return this.props.items.map((item, index) =>
			<li className={classes.item} key={index}>
				<Link className={classes.link} href={item.href} ripple={true}>
					<div className={classes.linkContent}>
						{item.icon}
						<span className={classes.text}>{item.text}</span>
					</div>
				</Link>
			</li>
		);
	}
}
