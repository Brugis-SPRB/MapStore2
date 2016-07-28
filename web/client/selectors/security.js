/**
* Copyright 2016, GeoSolutions Sas.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree.
*/

const {createSelector} = require('reselect');
const assign = require('object-assign');

const groupsNamesSelector = (state) => {
    if (!state.security || !state.security.groups) {
        return [];
    }
    return state.security.groups;
};

const usersSelector = (state) => {
    if (!state.security || !state.security.users) {
        return [];
    }
    return state.security.users;
};

const usersNamesSelector = createSelector(
  [usersSelector],
  users => users.map(user => user.userName)
);

const workspacesSelector = (state) => {
    if (!state.security || !state.security.workspaces) {
        return [];
    }
    return state.security.workspaces;
};

const workspacesNamesSelector = createSelector(
  [workspacesSelector],
  workspaces => workspaces.map(workspace => workspace.name)
);

const rulesSelector = (state) => {
    if (!state.security || !state.security.rules) {
        return [];
    }
    const rules = state.security.rules;
    return rules.map(rule => {
        const formattedRule = {};
        assign(formattedRule, {'id': rule.id});
        assign(formattedRule, {'priority': rule.priority});
        assign(formattedRule, {'roleName': rule.roleName ? rule.roleName : '*'});
        assign(formattedRule, {'userName': rule.userName ? rule.userName : '*'});
        assign(formattedRule, {'service': rule.service ? rule.service : '*'});
        assign(formattedRule, {'request': rule.request ? rule.request : '*'});
        assign(formattedRule, {'workspace': rule.workspace ? rule.workspace : '*'});
        assign(formattedRule, {'layer': rule.layer ? rule.layer : '*'});
        assign(formattedRule, {'access': rule.access});
        return formattedRule;
    });
};

module.exports = {
    groupsNamesSelector,
    usersSelector,
    usersNamesSelector,
    rulesSelector,
    workspacesNamesSelector,
    workspacesSelector
};
