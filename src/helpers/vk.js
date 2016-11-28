import {
	VK_AUTH_CONNECTED,
	VK_API_VERSION
} from '../constants/vk';

class VK {
	constructor() {
		this._VK = null;
	}

	initialize = id => {
		let initPromise;

		this.APP_ID = id;

		if (window.VK) {
			initPromise = Promise.resolve();
		} else {
			initPromise = new Promise(resolve => {
				window.vkAsyncInit = resolve;
			});
		}

		return initPromise.then(this._asyncInit);
	};

	startTrack = () => {
		return this.api('stats.trackVisitor');
	};

	getLoginStatus = () => {
		return new Promise((resolve, reject) => {
			this._VK.Auth.getLoginStatus(this._loginCallbackCreator(resolve, reject));
		});
	};

	login = permissionKey => {
		return new Promise((resolve, reject) => {
			this._VK.Auth.login(this._loginCallbackCreator(resolve, reject), permissionKey);
		});
	};

	fetchAudio = params => {
		const _params = {
			...params,
			owner_id: params.ownerId,
			album_id: params.albumId,
			audio_ids: params.audioIds
		};

		return this.api('audio.get', _params);
	};

	fetchRecommendations = params => {
		const _params = {
			...params,
			user_id: params.ownerId
		};

		return this.api('audio.getRecommendations', _params);
	};

	fetchAlbums = params => {
		const _params = {
			...params,
			owner_id: params.ownerId
		};

		return this.api('audio.getAlbums', _params);
	};

	fetchFriends = params => {
		const _params = {
			...params,
			order: 'hints',
			fields: 'photo_100',
			user_id: params.ownerId
		};

		return this.api('friends.get', _params);
	};

	fetchGroups = params => {
		const _params = {
			...params,
			extended: true,
			fields: 'photo_100',
			user_id: params.ownerId
		};

		return this.api('groups.get', _params);
	};

	fetchMembers = params => {
		const _params = {
			...params,
			extended: true,
			fields: 'photo_100',
			group_id: params.ownerId
		};

		return this.api('groups.getMembers', _params);
	};

	getUsers = ids => {
		return this.api('users.get', {
			user_ids: ids,
			fields: 'photo_100'
		});
	};

	api = (name, params = {}) => {
		const _params = {...params};

		Object.keys(_params).forEach(key => {
			const param = _params[key];

			if (!param && (typeof param !== 'number' || isNaN(param))) {
				delete _params[key];
			}
		});

		return new Promise((resolve, reject) => {
			this._VK.api(name, {..._params, v: VK_API_VERSION}, data => {
				if (data.error) {
					return reject(data.error.error_code);
				}

				resolve(data.response);
			});
		});
	};

	_asyncInit = () => {
		this._VK = window.VK;

		this._VK.init({
			apiId: this.APP_ID
		});

		delete window.vkAsyncInit;
	};

	_loginCallbackCreator = (resolve, reject) => data => {
		if (data.status !== VK_AUTH_CONNECTED) {
			return reject();
		}

		resolve({
			expire: data.session.expire * 1000, // convert to ms
			userId: Number(data.session.mid)
		});
	}
}

export default new VK();
