// @flow

import { ReducerRegistry, set } from '../base/redux';

import { SET_VOLUME_LEVEL } from './actionTypes';

const initialState = {
    BACKGROUND_MUSIC_SOUND_ID: 1,
    BACKGROUND_NOISE_SOUND_ID: 1
};

/**
 * Reduces the redux actions of the feature talk while muted.
 */
ReducerRegistry.register('features/audio-ambience', (state = initialState, action) => {
    switch (action.type) {
    case SET_VOLUME_LEVEL:
        return set(state, action.soundId, action.level);
    }

    return state;
});
