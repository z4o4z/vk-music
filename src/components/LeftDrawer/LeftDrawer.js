import React, {Component, PropTypes} from 'react';

import Drawer from 'material-ui/Drawer';

export default class LeftDrawer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    topPosition: PropTypes.number.isRequired
  };

  render() {
    return (
      <Drawer open={this.props.open} zDepth={0} containerStyle={{top: this.props.topPosition}}>
      </Drawer>
    );
  }
}
