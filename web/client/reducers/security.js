/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CHANGE_PASSWORD_SUCCESS,
        GROUPS_LOADED, USERS_LOADED, WORKSPACES_LOADED, UPDATE_RULES_FILTERS_VALUES, RULES_LOADED,
        UPDATE_RULES_PAGE } = require('../actions/security');
const SecurityUtils = require('../utils/SecurityUtils');

const assign = require('object-assign');

function security(state = {user: null, errorCause: null}, action) {
    switch (action.type) {

        case LOGIN_SUCCESS:
            const userAttributes = SecurityUtils.getUserAttributes(action.userDetails.User);
            const userUuid = userAttributes.find(attribute => attribute.name.toLowerCase() === 'uuid');
            return assign({}, state, {
                user: action.userDetails.User,
                token: userUuid && userUuid.value || '',
                authHeader: action.authHeader,
                loginError: null
            });
        case LOGIN_FAIL:
            return assign({}, state, {
                loginError: action.error
            });
        case LOGOUT:
            return assign({}, state, {
                user: null,
                token: null,
                authHeader: null,
                loginError: null
            });
        case CHANGE_PASSWORD_SUCCESS:
            return assign({}, state, {
                user: assign({}, state.user, assign({}, action.user, {date: new Date().getUTCMilliseconds()})),
                authHeader: action.authHeader
            });
        case GROUPS_LOADED:
            return assign({}, state, {
                groups: action.groups.roles
            });
        case USERS_LOADED:
            return assign({}, state, {
                users: action.users.users
            });
        case WORKSPACES_LOADED:
            return assign({}, state, {
                workspaces: action.workspaces && action.workspaces.workspaces.workspace || []
            });
        case UPDATE_RULES_FILTERS_VALUES:
            return assign({}, state, {
                rulesFiltersValues: assign({}, state.rulesFiltersValues || {}, action.filterValue)
            });
        case UPDATE_RULES_PAGE:
            return assign({}, state, {
                rulesPage: action.page || 1
            });
        case RULES_LOADED:
            return assign({}, state, {
                rules: action.rules && action.rules.rules || [],
                rulesCount: action.rules && action.rules.count || 0
            });
        default:
            return state;
    }
}

module.exports = security;
