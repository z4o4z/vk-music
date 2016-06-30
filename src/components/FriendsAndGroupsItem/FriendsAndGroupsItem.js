import React, {Component, PropTypes} from 'react';

import classes from './audioItem.scss';

export default class FriendsAndGroupsItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className={classes.component}>
        <img src={this.props.photo} alt=""/>
        <span>{this.props.name}</span>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    const {id, name, photo} = this.props;

    return id !== nextProps.id || name !== nextProps.name || photo !== nextProps.photo;
  }
}
