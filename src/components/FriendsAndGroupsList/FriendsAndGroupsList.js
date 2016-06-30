import React, {Component, PropTypes} from 'react';
import ReactList from 'react-list';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';

import Scrollable from '../Scrollable/Scrollable';
import FriendsAndGroupsItem from '../FriendsAndGroupsItem/FriendsAndGroupsItem';

export default class FriendsAndGroupsList extends Component {
  static propTypes = {
    items: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired,
    offset: PropTypes.number.isRequired,
    fetchCount: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.number.isRequired,
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.props.fetch(0, this.props.fetchCount);
  }

  render() {
    return (
      <Scrollable onScroll={this.onScroll}>
        <ReactList
          itemRenderer={this.renderItem}
          length={this.props.ids.length}
          pageSize={this.props.fetchCount}
          type="uniform"
          useStaticSize={true}
          useTranslate3d={true}
        />
      </Scrollable>
    );
  }

  shouldComponentUpdate(newProps) {
    const {items, ids, offset, fetchCount, loading, error} = newProps;

    return this.props.items !== items || this.props.ids !== ids ||
      this.props.offset !== offset || this.props.fetchCount !== fetchCount ||
      this.props.loading !== loading || this.props.error !== error;
  }

  renderItem(index, key) {
    const item = this.props.items[this.props.ids[index]];

    return (
      <FriendsAndGroupsItem
        key={key}
        id={item.id}
        name={this.getName()}
        photo={item.photo_100}
      />
    );
  }
  onScroll(scrollTop, height, childHeight) {
    if (scrollTop >= childHeight - height - UI_SCROLL_UPDATE_HEIGHT && !this.props.loading) {
      this.props.updateAudio(this.props.offset + this.props.fetchCount + 1, this.props.fetchCount);
    }
  }
}
