import React, {PropTypes} from 'react';

import Link from '../Link/Link';

import classes from './leftDrawerList.scss';

export default function LeftDrawerList(props) {
	return (
		<ul className={classes.list}>
			{props.items.map((item, index) =>
				<li className={classes.item} key={index}>
					<Link className={classes.link} href={item.href} ripple={true}>
						<div className={classes.linkContent}>
							{item.icon}
							<span className={classes.text}>{item.text}</span>
						</div>
					</Link>
				</li>
			)}
		</ul>
	);
}

LeftDrawerList.propTypes = {
	items: PropTypes.array.isRequired
};
