import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ReactList from 'react-list';

import LoaderHOC from '../../hoc/LoaderHOC/LoaderHOC';
import EssenceItem from '../EssenceItem/EssenceItem';

class EssencesList extends Component {
	static propTypes = {
		ids: PropTypes.array.isRequired,
		essences: PropTypes.object.isRequired,
		pageSize: PropTypes.number.isRequired,
		userId: PropTypes.number.isRequired,
		getItemProps: PropTypes.func.isRequired
	};

	render() {
		return (
			<ReactList
				itemRenderer={this.renderItem}
				length={this.props.ids.length}
				pageSize={this.props.pageSize}
				useStaticSize={true}
				useTranslate3d={true}
			/>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	renderItem = (index, key) => {
		const item = this.props.essences[this.props.ids[index]];

		return <EssenceItem {...this.props.getItemProps(key, item)}/>;
	};
}

export default LoaderHOC('ids')(EssencesList);
