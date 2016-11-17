import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';

import {AUDIOS_FETCH_COUNT} from '../constants/audios';
import {PLAYER_MAX_AUDIO_COUNT_BEFORE_FETCH} from '../constants/player';

import vk from '../helpers/vk';
import normalizeBy from '../helpers/normalizeBy';

import {playerNext, playerPlaylistFetched} from '../actions/player';
import {entitiesSetItems} from '../actions/entities';

function* fetchAudiosIfNeeded() {
	const {player, entities} = yield select();

	if (player.playlist.length - player.playlist.indexOf(player.current) <= PLAYER_MAX_AUDIO_COUNT_BEFORE_FETCH) {
		const {userId, albumId} = entities[player.entityId];

		try {
			const data = yield call(vk.fetchAudio, {userId, albumId, offset: player.offset, count: AUDIOS_FETCH_COUNT});
			const audios = normalizeBy(data.items, 'id');

			yield put(entitiesSetItems({
				id: `${userId}-audios`,
				items: audios.normalized
			}));

			yield put(playerPlaylistFetched({
				ids: audios.ids,
				offset: player.offset + AUDIOS_FETCH_COUNT
			}));
		} catch (e) {
			console.error(e);
		}
	}
}

export default function* () {
	yield takeEvery(playerNext.toString(), fetchAudiosIfNeeded);
}
