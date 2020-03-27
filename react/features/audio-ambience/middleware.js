// @flow

import { APP_WILL_MOUNT, APP_WILL_UNMOUNT } from '../base/app';
import { CONFERENCE_JOINED } from '../base/conference';

import { MiddlewareRegistry } from '../base/redux';
import { playSound, registerSound, unregisterSound } from '../base/sounds';


import { openDialog } from '../base/dialog';

import {
    AudioMixerDialog
} from './components';


import { OPEN_AUDIO_MIXER } from './actionTypes';
import { BACKGROUND_MUSIC_SOUND_ID, BACKGROUND_NOISE_SOUND_ID } from './constants';
import { BACKGROUND_MUSIC_SOUND_FILE, BACKGROUND_NOISE_SOUND_FILE } from './sounds';

MiddlewareRegistry.register(store => next => action => {
    const result = next(action);
    const { dispatch } = store;

    switch (action.type) {
    case APP_WILL_MOUNT:
        dispatch(registerSound(BACKGROUND_MUSIC_SOUND_ID, BACKGROUND_MUSIC_SOUND_FILE, { loop: true }));
        dispatch(registerSound(BACKGROUND_NOISE_SOUND_ID, BACKGROUND_NOISE_SOUND_FILE, { loop: true }));

        break;
    case APP_WILL_UNMOUNT:
        dispatch(unregisterSound(BACKGROUND_MUSIC_SOUND_ID));
        dispatch(unregisterSound(BACKGROUND_NOISE_SOUND_ID));

        break;

    case CONFERENCE_JOINED: {
        dispatch(playSound(BACKGROUND_MUSIC_SOUND_ID));
        dispatch(playSound(BACKGROUND_NOISE_SOUND_ID));
        break;
    }
    case OPEN_AUDIO_MIXER:
        return _openAudioMixer(store, next, action);
    }

    return result;
});


// @flow


/**
 * Notifies the feature invite that the action {@link BEGIN_ADD_PEOPLE} is being
 * dispatched within a specific redux {@code store}.
 *
 * @param {Store} store - The redux store in which the specified {@code action}
 * is being dispatched.
 * @param {Dispatch} next - The redux {@code dispatch} function to dispatch the
 * specified {@code action} to the specified {@code store}.
 * @param {Action} action - The redux action {@code BEGIN_ADD_PEOPLE} which is
 * being dispatched in the specified {@code store}.
 * @private
 * @returns {*} The value returned by {@code next(action)}.
 */
function _openAudioMixer({ dispatch }, next, action) {
    const result = next(action);

    dispatch(openDialog(AudioMixerDialog));

    return result;
}
