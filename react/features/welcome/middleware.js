// @flow


import { MiddlewareRegistry } from '../base/redux';

import { SET_INVITE_FORM_SUBMIT_SUCCESS } from './actionTypes';


import { openDialog } from '../base/dialog';

import {
    InviteSuccessDialog
} from './components';

declare var APP: Object;

/**
 * Middleware that captures joined rooms so they can be saved into
 * {@code window.localStorage}.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    switch (action.type) {
    case SET_INVITE_FORM_SUBMIT_SUCCESS:
        return _openSuccessDialog(store, next, action);
    }

    return next(action);
});


function _openSuccessDialog({ dispatch }, next, action) {
    const result = next(action);

    console.log('componentProps', action);

    dispatch(openDialog(InviteSuccessDialog, action));

    return result;
}
