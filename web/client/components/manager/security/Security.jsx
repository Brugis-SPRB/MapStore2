/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const Filters = require('./Filters');
const Rules = require('./Rules');

const Security = React.createClass({
    propTypes: {
        getRules: React.PropTypes.func,
        updateRulesPage: React.PropTypes.func,
        loadGroups: React.PropTypes.func,
        loadUsers: React.PropTypes.func,
        loadServices: React.PropTypes.func,
        loadRequest: React.PropTypes.func,
        loadWorkspaces: React.PropTypes.func,
        loadLayes: React.PropTypes.func,
        updateFiltersValues: React.PropTypes.func,
        filtersValues: React.PropTypes.object,
        options: React.PropTypes.object,
        rulesCount: React.PropTypes.number,
        rules: React.PropTypes.array,
        rulesPage: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            getRules: () => {}
        };
    },
    render() {
        return (
            <div>
                <Filters
                    loadGroups={this.props.loadGroups}
                    loadUsers={this.props.loadUsers}
                    loadWorkspaces={this.props.loadWorkspaces}
                    updateFiltersValues={this.props.updateFiltersValues}
                    filtersValues={this.props.filtersValues}
                    options={this.props.options}/>
                <Rules
                    getRules={this.props.getRules}
                    updateRulesPage={this.props.updateRulesPage}
                    filtersValues={this.props.filtersValues}
                    rules={this.props.rules}
                    rulesCount={this.props.rulesCount}
                    rulesPage={this.props.rulesPage}/>
            </div>
        );
    }
});
module.exports = Security;
