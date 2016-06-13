import React, {Component, PropTypes} from 'react';

import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import AvLibraryMusic from 'material-ui/svg-icons/av/library-music';
import AVArtTrack from 'material-ui/svg-icons/av/art-track';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialPeople from 'material-ui/svg-icons/social/people';
import SocialWhatshot from 'material-ui/svg-icons/social/whatshot';
import SocialNotifications from 'material-ui/svg-icons/social/notifications';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';

import classes from './leftDrawer.scss';

export default class LeftDrawer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    topPosition: PropTypes.number.isRequired
  };

  render() {
    return (
      <Drawer className={classes.component} open={this.props.open} zDepth={2} containerStyle={{top: this.props.topPosition}}>
        <List className={classes.list}>
          <ListItem primaryText="Аудиозаписи" leftIcon={<AvLibraryMusic />} />
          <ListItem primaryText="Альбомы" leftIcon={<AVArtTrack />} />
          <ListItem primaryText="Друзья" leftIcon={<SocialPerson />} />
          <ListItem primaryText="Группы" leftIcon={<SocialPeople />} />
          <ListItem primaryText="Обновления" leftIcon={<SocialNotifications />} />
          <ListItem primaryText="Рекомендации" leftIcon={<ActionThumbUp />} />
          <ListItem primaryText="Популярные" leftIcon={<SocialWhatshot />} />
        </List>
        <List className={classes.list}>
          <ListItem primaryText="Настройки" leftIcon={<AvLibraryMusic />} />
        </List>
      </Drawer>
    );
  }
}
