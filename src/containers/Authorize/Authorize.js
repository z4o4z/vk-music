import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {vkAuthorize} from '../../actions/vk';

import Scrollable from '../../components/Scrollable/Scrollable';
import Button from '../../components/Button/Button';

import classes from './authorize.scss';

function Authorize(props) {
	return (
		<Scrollable>
			<div className={classes.component}>
				<h2 className={classes.title} data-text="VK Music">VK Music</h2>
				<Button className={classes.button} ripple={true} onClick={props.authorize} >
					<span>Авторизоваться</span>
				</Button>
			</div>
		</Scrollable>
	);
}

Authorize.propTypes = {
	authorized: PropTypes.bool.isRequired,
	authorize: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	authorized: state.vk.authorized
});

const mapDispatchToProps = dispatch => ({
	authorize: () => dispatch(vkAuthorize())
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);
