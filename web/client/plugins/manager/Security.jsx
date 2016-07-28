/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const assign = require('object-assign');
const {connect} = require('react-redux');
const {createSelector} = require('reselect');
const {getGroups, getUsers, getWorkspaces, getRules, updateRulesPage, updateRulesFiltersValues} = require('../../actions/security');
const {groupsNamesSelector, usersNamesSelector, workspacesNamesSelector, rulesSelector} = require('../../selectors/security');

const toSelectEntryTransform = function(options) {
    return options.map(option => {
        return { value: option, label: option };
    });
};

const securitySelector = createSelector([
    groupsNamesSelector,
    usersNamesSelector,
    workspacesNamesSelector,
    rulesSelector,
    (state) => state.security && state.security.rulesCount,
    (state) => state.security && state.security.rulesPage,
    (state) => state.security && state.security.rulesFiltersValues
], (groups, users, workspaces, rules, rulesCount, rulesPage, rulesFiltersValues) => ({
    options: {
        'user': toSelectEntryTransform(users),
        'group': toSelectEntryTransform(groups),
        'workspace': toSelectEntryTransform(workspaces)
    },
    rules: rules,
    rulesCount: rulesCount,
    rulesPage: rulesPage,
    filtersValues: rulesFiltersValues
}));

const SecurityPlugin = connect(securitySelector, {
    getRules: getRules,
    loadGroups: getGroups,
    loadUsers: getUsers,
    loadWorkspaces: getWorkspaces,
    updateRulesPage: updateRulesPage,
    updateFiltersValues: updateRulesFiltersValues
})(require('../../components/manager/security/Security'));

module.exports = {
    SecurityPlugin: assign(SecurityPlugin, {
        hide: true,
        Manager: {
            id: "security",
            name: 'security',
            position: 2,
            title: 'Security Rules'
        }
    }),
    reducers: {importer: require('../../reducers/security')}
};
