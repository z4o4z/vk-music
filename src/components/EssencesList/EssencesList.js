import React, {PropTypes} from 'react';

import ReactTooltip from 'react-tooltip';

import LoaderHOC from '../../hoc/LoaderHOC/LoaderHOC';
import EssenceItem from '../EssenceItem/EssenceItem';

function EssencesList(props) {
	return (
		<div>
			{props.ids.map(id =>
				<EssenceItem {...props.getItemProps(props.essences[id])} />
			)}

			<ReactTooltip effect='solid' />
		</div>
	);
}

EssencesList.propTypes = {
	ids: PropTypes.array.isRequired,
	essences: PropTypes.object.isRequired,
	pageSize: PropTypes.number.isRequired,
	ownerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	getItemProps: PropTypes.func.isRequired
};

export default LoaderHOC('ids')(EssencesList);
