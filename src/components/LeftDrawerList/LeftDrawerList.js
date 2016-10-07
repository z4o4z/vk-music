import React, {Component, PropTypes} from 'react';

import RippleButton from '../RippleButton/RippleButton';

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

	shouldComponentUpdate(nextProps) {
		return this.props.items !== nextProps.items;
	}

	getItems() {
		return this.props.items.map((item, index) =>
			<li className={classes.item} key={index}>
				<RippleButton className={classes.button} href={item.href}>
					<div className={classes.buttonContent}>
						{item.icon}
						<span className={classes.text}>{item.text}</span>
					</div>
				</RippleButton>
			</li>
		);
	}
}
