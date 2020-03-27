// @flow

import {
    SET_SIDEBAR_VISIBLE,
    SET_WELCOME_PAGE_LISTS_DEFAULT_PAGE,
    SET_INVITE_FORM_SUBMIT_SUCCESS
} from './actionTypes';

/**
 * Sets the visibility of {@link WelcomePageSideBar}.
 *
 * @param {boolean} visible - If the {@code WelcomePageSideBar} is to be made
 * visible, {@code true}; otherwise, {@code false}.
 * @returns {{
 *     type: SET_SIDEBAR_VISIBLE,
 *     visible: boolean
 * }}
 */
export function setSideBarVisible(visible: boolean) {
    return {
        type: SET_SIDEBAR_VISIBLE,
        visible
    };
}

/**
 * Sets the default page index of {@link WelcomePageLists}.
 *
 * @param {number} pageIndex - The index of the default page.
 * @returns {{
 *     type: SET_WELCOME_PAGE_LISTS_DEFAULT_PAGE,
 *     pageIndex: number
 * }}
 */
export function setWelcomePageListsDefaultPage(pageIndex: number) {
    return {
        type: SET_WELCOME_PAGE_LISTS_DEFAULT_PAGE,
        pageIndex
    };
}


/**
 * Toggles success flag on form submit.
 *
 * @param {boolean} isSubmitSuccessful - Should the flag be set as true.
 * @returns {undefined}
 */
export function setInviteFormSubmissionState(isSubmitSuccessful: boolean) {
    return {
        type: SET_INVITE_FORM_SUBMIT_SUCCESS,
        isSubmitSuccessful
    };
}
