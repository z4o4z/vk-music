export default {
	vk: {
		initialized: false
	},

	authorize: {
		authorized: false,
		authError: false,
		ownerId: 0,
		expire: 0,
		redirectPage: '/'
	},

	ui: {
		leftMenuOpen: false,
		showLoader: false
	},

	audio: {
		all: {},
		owners: {},
		albums: {},
		loading: false,
		error: 0
	},

	friends: {
		all: {},
		users: {},
		loading: false,
		error: 0
	},

	albums: {
		all: {},
		users: {},
		loading: false,
		error: 0
	},

	player: {
		playlist: [],
		page: '',
		albumId: 0,
		ownerId: 0,
		current: 0,
		next: 0,
		prev: 0,
		playing: false
	}
};
