import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';

import MyRouter from '../../router/index.js';

export default class Root extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	render() {
		return (
			<Provider store={this.props.store}>
				<MyRouter history={this.props.history}/>
			</Provider>
		);
	}
}
