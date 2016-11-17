import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {vkAuthorize} from '../../actions/vk';

import Scrollable from '../../components/Scrollable/Scrollable';
import RippleButton from '../../components/RippleButton/RippleButton';

import classes from './authorize.scss';

class Authorize extends Component {
	static propTypes = {
		authorized: PropTypes.bool.isRequired,
		authorize: PropTypes.func.isRequired
	};

	render() {
		return (
			<Scrollable>
				<div className={classes.component}>
					<h2 className={classes.title} data-text="VK Music">VK Music</h2>
					<RippleButton className={classes.button} onClick={this.props.authorize}>
						<span>Авторизоваться</span>
					</RippleButton>
				</div>
			</Scrollable>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
}

const mapStateToProps = state => ({
	authorized: state.vk.authorized
});

const mapDispatchToProps = dispatch => ({
	authorize: () => dispatch(vkAuthorize())
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);
