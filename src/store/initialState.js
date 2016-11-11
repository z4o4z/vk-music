export default {
	vk: {
		initialized: false,
		authorized: false,
		authorizing: false,
		authorizeError: null,
		userId: null,
		expire: 0
	},

	ui: {
		leftMenuOpen: false
	},

	audios: {},

	users: {},

	albums: {},

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
