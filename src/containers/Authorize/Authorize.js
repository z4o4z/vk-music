import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {authorize} from '../../actions/authorize';

import Scrollable from '../../components/Scrollable/Scrollable';
import RippleButton from '../../components/RippleButton/RippleButton';

import classes from './authorize.scss';

class Authorize extends Component {
  static propTypes = {
    authorized: PropTypes.bool.required,
    redirectPage: PropTypes.string.required,
    authorize: PropTypes.func.required
  };

  componentDidUpdate() {
    if (this.props.authorized) {
      browserHistory.push(this.props.redirectPage);
    }
  }

  render() {
    return (
      <Scrollable>
        <div className={classes.component}>
          <h1>Для использования приложения необходимо авторизоваться!</h1>
          <RippleButton onClick={this.props.authorize}>
            <span>Авторизоваться</span>
          </RippleButton>
        </div>
      </Scrollable>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.authorize.authorized,
  redirectPage: state.authorize.redirectPage
});

const mapDispatchToProps = dispatch => ({
  authorize: expire => dispatch(authorize(expire))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);
