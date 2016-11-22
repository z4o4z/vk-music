import React, {Component} from 'react';

import classes from './loaderHOC.scss';

const Loader = (
	<div className={classes.component}>
		<div className={classes.loading}>
			<div className={classes.ring}>
				<i className={classes.svg} />
			</div>
			<div className={classes.ring}>
				<i className={classes.svg} />
			</div>
		</div>
	</div>
);

const LoaderHOC = propName => WrappedComponent => {
	return class LoaderHOC extends Component {
		render() {
			if (this.props[propName] && this.props[propName].length) {
				return <WrappedComponent {...this.props} />;
			}

			return Loader;
		}
	};
};

export default LoaderHOC;
