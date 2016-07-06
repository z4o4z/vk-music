import React, {Component, PropTypes} from 'react';
import ReactList from 'react-list';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';

import Scrollable from '../Scrollable/Scrollable';
import FriendsAndGroupsItem from '../FriendsAndGroupsItem/FriendsAndGroupsItem';

export default class FriendsAndGroupsList extends Component {
  static propTypes = {
    all: PropTypes.object.isRequired,
    owners: PropTypes.object.isRequired,
    fetchCount: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.number.isRequired,
    currentUserId: PropTypes.number.isRequired,
    params: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = this.getUserData(this.props);

    this.renderItem = this.renderItem.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.fetch(this.props.fetchCount, this.props.params.ownerId);
  }

  render() {
    return (
      <Scrollable onScroll={this.onScroll}>
        <ReactList
          itemRenderer={this.renderItem}
          length={this.state.ids.length}
          pageSize={this.props.fetchCount}
          useStaticSize={true}
          useTranslate3d={true}
        />
      </Scrollable>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {all, fetchCount, loading, error, params} = nextProps;
    const {ids, offset, allLoaded} = nextState;

    return this.props.all !== all || this.props.fetchCount !== fetchCount ||
      this.props.loading !== loading || this.props.error !== error ||
      this.props.params.ownerId !== params.ownerId ||
      this.state.ids !== ids || this.state.offset !== offset ||
      this.state.allLoaded !== allLoaded;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getUserData(nextProps));
  }

  componentWillUpdate(nextProps) {
    if (this.props.params.ownerId !== nextProps.params.ownerId) {
      this.fetch(this.props.fetchCount, nextProps.params.ownerId);
    }
  }

  getUserData(props) {
    const id = Number(props.params.ownerId) || props.currentUserId;
    const owner = props.owners[id] || {};

    return {
      ids: owner.ids || [],
      offset: owner.offset || 0,
      allLoaded: owner.allLoaded || false
    };
  }

  renderItem(index, key) {
    const item = this.props.all[this.state.ids[index]];

    return (
      <FriendsAndGroupsItem
        key={key}
        id={item.uid}
        name={this.getName(item)}
        photo={item.photo_100}
      />
    );
  }

  fetch(count, ownerId) {
    const id = Number(ownerId) || this.props.currentUserId;

    return this.props.fetch(0, count, id);
  }

  update(count, ownerId) {
    const from = this.state.offset + count + 1;
    const id = Number(ownerId) || this.props.currentUserId;

    return this.props.fetch(from, count, id);
  }

  onScroll(scrollTop, height, childHeight) {
    const updateHeight = childHeight - height - UI_SCROLL_UPDATE_HEIGHT;

    if (scrollTop >= updateHeight && !this.props.loading && !this.state.allLoaded) {
      this.update(this.props.fetchCount, this.props.params.ownerId);
    }
  }
}
