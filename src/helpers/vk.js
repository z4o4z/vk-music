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
		const _params = {...params};

		_params.owner_id = params.userId;
		_params.album_id = params.albumId;
		_params.audio_ids = params.audioIds;

		return this.api('audio.get', params);
	};

	getUsers = ids => {
		return this.api('users.get', {
			user_ids: ids,
			fields: 'photo_100'
		});
	};

	api = (name, params) => {
		return new Promise((resolve, reject) => {
			this._VK.api(name, {...params, v: VK_API_VERSION}, data => {
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
