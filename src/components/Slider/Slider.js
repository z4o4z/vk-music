import React, {PropTypes} from 'react';
import cns from 'classnames';

import ReactSlider from 'react-slider';

import classes from './slider.scss';

const Slider = props => (
	<ReactSlider
		handleClassName={classes.handle}
		barClassName ={classes.bar}
		withBars={true}
		{...props}
		className={cns(classes.component, props.className, classes[props.orientation])}
	/>
);

Slider.propTypes = {
	className: PropTypes.string,
	orientation: PropTypes.string
};

export default Slider;
