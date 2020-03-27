/**
 * The type of Redux action which sets the pending notification UID
 * to use it for when hiding the notification is necessary, or unsets it when
 * undefined (or no param) is passed.
 *
 * {
 *     type: SET_CURRENT_NOTIFICATION_UID,
 *     uid: ?number
 * }
 * @public
 */
export const OPEN_AUDIO_MIXER = 'OPEN_AUDIO_MIXER';

export const SET_VOLUME_LEVEL = 'SET_VOLUME_LEVEL';
