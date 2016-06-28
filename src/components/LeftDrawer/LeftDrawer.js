import React, {Component, PropTypes} from 'react';

import AvLibraryMusic from 'react-icons/lib/md/library-music';
import AvAlbum from 'react-icons/lib/md/album';
import SocialPerson from 'react-icons/lib/md/person';
import SocialPeople from 'react-icons/lib/md/people';
import SocialWhatshot from 'react-icons/lib/md/whatshot';
import SocialNotifications from 'react-icons/lib/md/notifications';
import ActionThumbUp from 'react-icons/lib/md/thumb-up';
import ActionSettings from 'react-icons/lib/md/settings';

import LeftDrawerList from '../LeftDrawerList/LeftDrawerList';

import classes from './leftDrawer.scss';

export default class LeftDrawer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired
  };

  state = {
    topList: [{
      icon: <AvLibraryMusic className={classes.icon} size={24} color="white" />,
      text: 'Аудиозаписи'
    }, {
      icon: <AvAlbum className={classes.icon} size={24} color="white" />,
      text: 'Альбомы'
    }, {
      icon: <SocialPerson className={classes.icon} size={24} color="white" />,
      text: 'Друзья'
    }, {
      icon: <SocialPeople className={classes.icon} size={24} color="white" />,
      text: 'Группы'
    }, {
      icon: <SocialWhatshot className={classes.icon} size={24} color="white" />,
      text: 'Обновления'
    }, {
      icon: <SocialNotifications className={classes.icon} size={24} color="white" />,
      text: 'Рекомендации'
    }, {
      icon: <ActionThumbUp className={classes.icon} size={24} color="white" />,
      text: 'Популярные'
    }],
    bottomList: [{
      icon: <ActionSettings className={classes.icon} size={24} color="white" />,
      text: 'Настройки'
    }]
  };

  render() {
    return (
      <aside className={this.getClassName()}>
        <LeftDrawerList items={this.state.topList}/>
        <LeftDrawerList items={this.state.bottomList}/>
      </aside>
    );
  }

  shouldComponentUpdate(nextProps) {
    return this.props.open !== nextProps.open;
  }

  getClassName() {
    return `${classes.component} ${this.props.open ? classes.componentOpen : ''}`;
  }
}
