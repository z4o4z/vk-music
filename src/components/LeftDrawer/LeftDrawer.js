import React, {PureComponent, PropTypes} from 'react';
import cns from 'classnames';

import QueueMusic from 'react-icons/lib/md/queue-music';
import AvLibraryMusic from 'react-icons/lib/md/library-music';
import AvAlbum from 'react-icons/lib/md/album';
import SocialPerson from 'react-icons/lib/md/person';
import SocialPeople from 'react-icons/lib/md/people';
import Notifications from 'react-icons/lib/md/notifications';
import ActionThumbUp from 'react-icons/lib/md/thumb-up';
import ActionSettings from 'react-icons/lib/md/settings';
import Home from 'react-icons/lib/md/home';
import LibraryBooks from 'react-icons/lib/md/library-books';

import {UI_SIZE_ICON, UI_COLOR_DEFAULT} from '../../constants/ui';

import LeftDrawerList from '../LeftDrawerList/LeftDrawerList';

import classes from './leftDrawer.scss';

const menuItems = {
	topList: [{
		icon: <QueueMusic className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Плейлист',
		href: 'playlist'
	}, {
		icon: <AvLibraryMusic className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Аудиозаписи',
		href: ''
	}, {
		icon: <AvAlbum className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Альбомы',
		href: 'albums'
	}, {
		icon: <LibraryBooks className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Новости',
		href: 'news'
	}, {
		icon: <Home className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Стена',
		href: 'wall'
	}, {
		icon: <SocialPerson className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Друзья',
		href: 'friends'
	}, {
		icon: <SocialPeople className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Группы',
		href: 'groups'
	}, {
		icon: <Notifications className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Рекомендации',
		href: 'recommendations'
	}, {
		icon: <ActionThumbUp className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Популярные',
		href: 'popular'
	}],
	bottomList: [{
		icon: <ActionSettings className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Настройки',
		href: 'settings'
	}]
};

export default class LeftDrawer extends PureComponent {
	static propTypes = {
		urlPrefix: PropTypes.string.isRequired,
		open: PropTypes.bool.isRequired
	};

	constructor(props) {
		super(props);

		this.state = this.getState(props);
	}

	render() {
		return (
			<aside className={cns(classes.component, {[classes.componentOpen]: this.props.open})}>
				<LeftDrawerList items={this.state.topList} />
				<LeftDrawerList items={this.state.bottomList} />
			</aside>
		);
	}

	componentWillReceiveProps(newProps) {
		this.setState(this.getState(newProps));
	}

	getState(props) {
		return {
			topList: menuItems.topList.map(item => ({
				...item,
				href: `/${props.urlPrefix}${item.href ? '/' + item.href : ''}`
			})),
			bottomList: menuItems.bottomList.map(item => ({
				...item,
				href: `/${props.urlPrefix}${item.href ? '/' + item.href : ''}`
			}))
		};
	}
}
