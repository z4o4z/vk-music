import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';

import MyRouter from '../../router/index.js';

export default function Root(props) {
	return (
		<Provider store={props.store}>
			<MyRouter history={props.history}/>
		</Provider>
	);
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};
