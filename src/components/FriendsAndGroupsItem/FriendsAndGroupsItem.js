import React, {Component, PropTypes} from 'react';

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
            <a className={classes.link} href={`//vk.com/id${this.props.id}`} target="_blank" onClick={this.onClick}>Профиль</a>
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
