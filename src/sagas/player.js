import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';

import {AUDIOS_FETCH_COUNT} from '../constants/general';
import {PLAYER_MAX_AUDIO_COUNT_BEFORE_FETCH} from '../constants/general';

import vk from '../helpers/vk';
import shuffleAndSetFirst from '../helpers/shuffleAndSetFirst';
import normalizeBy from '../helpers/normalizeBy';

import {
	playerNext,
	playerSetFetching,
	playerFetchPlaylist,
	playerPlaylistFetched,
	playerResetPlaylist,
	playerShuffle
} from '../actions/player';
import {entitiesSetItems} from '../actions/entities';

function* fetchPlaylist() {
	const {player, entities} = yield select();

	const {userId, albumId} = entities[player.entityId];

	yield put(playerSetFetching());

	try {
		const data = yield call(vk.fetchAudio, {userId, albumId, offset: player.offset, count: AUDIOS_FETCH_COUNT});
		const audios = normalizeBy(data.items, 'id');

		yield put(entitiesSetItems({
			id: `${userId}-audios`,
			items: audios.normalized
		}));

		yield put(playerPlaylistFetched({
			ids: player.isShuffling ? shuffle(audios.ids) : audios.ids,
			offset: player.offset + AUDIOS_FETCH_COUNT
		}));
	} catch (e) {
		console.error(e);
	}
}

function* fetchAudiosIfNeeded() {
	const {player} = yield select();

	if (player.playlist.length - player.playlist.indexOf(player.current) <= PLAYER_MAX_AUDIO_COUNT_BEFORE_FETCH) {
		yield call(fetchPlaylist);
	}
}

function* fetchShuffleAudios() {
	const {player, entities} = yield select();
	const {userId, albumId} = entities[player.entityId];

	yield put(playerSetFetching());

	try {
		const data = yield call(vk.fetchAudio, {userId, albumId, offset: 0, count: player.offset});
		const audios = normalizeBy(data.items, 'id');
		let ids = audios.ids;

		if (player.isShuffling) {
			ids = shuffleAndSetFirst(ids, player.current);
		}

		yield put(entitiesSetItems({
			id: `${userId}-audios`,
			items: audios.normalized
		}));

		yield put(playerResetPlaylist(ids));
	} catch (e) {
		console.error(e);
	}
}

export default function* () {
	yield takeEvery(playerNext.toString(), fetchAudiosIfNeeded);
	yield takeEvery(playerShuffle.toString(), fetchShuffleAudios);
	yield takeEvery(playerFetchPlaylist.toString(), fetchPlaylist);
}
