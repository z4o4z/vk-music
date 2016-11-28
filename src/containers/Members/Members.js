import React from 'react';
import {connect} from 'react-redux';

import {Friends} from '../Friends/Friends';

import {groupsFetchMembers} from '../../actions/groups';

const Members = props => <Friends {...props} />;

const mapStateToProps = ({users, entities}, ownProps) => {
	const ownerId = ownProps.params.ownerId;
	const entityId = `${ownerId}-members`;
	const {ids, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		ids,
		fetching,
		error,
		offset,
		count,
		ownerId,
		entityId,
		items: users
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(groupsFetchMembers({...params}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
