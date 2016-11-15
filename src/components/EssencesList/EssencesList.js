import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ReactList from 'react-list';

import EssenceItem from '../EssenceItem/EssenceItem';

export default class EssencesList extends Component {
	static propTypes = {
		essences: PropTypes.array.isRequired,
		pageSize: PropTypes.number.isRequired,
		userId: PropTypes.number.isRequired,
		getItemProps: PropTypes.func.isRequired
	};

	render() {
		return (
			<ReactList
				itemRenderer={this.renderItem}
				length={this.props.essences.length}
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
		const item = this.props.essences[index];

		return <EssenceItem {...this.props.getItemProps(key, item)}/>;
	};
}
