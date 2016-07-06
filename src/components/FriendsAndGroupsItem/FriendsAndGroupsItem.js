import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import RippleButton from '../RippleButton/RippleButton';

import classes from './friendsAndGroupsItem.scss';

export default class FriendsAndGroupsItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired
  };

  render() {
    return (
      <RippleButton className={classes.component} href={`/friend/${this.props.id}`}>
        <div className={classes.content}>
          <img className={classes.photo} src={this.props.photo} alt=""/>
          <div className={classes.wrapper}>
            <span className={classes.name} >{this.props.name}</span>
            <div>
              <Link className={classes.link} to={`/friends/${this.props.id}`} onClick={this.onClick} >Друзья</Link>
              <Link className={classes.link} to={`//vk.com/id${this.props.id}`} target="_blank" onClick={this.onClick}>Профиль</Link>
            </div>
          </div>
        </div>
      </RippleButton>
    );
  }

  shouldComponentUpdate(nextProps) {
    const {id, name, photo} = this.props;

    return id !== nextProps.id || name !== nextProps.name || photo !== nextProps.photo;
  }

  onClick(e) {
    e.stopPropagation();
  }
}
