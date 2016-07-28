/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {Panel} = require('react-bootstrap');

const Select = require('./Select');

const Filters = React.createClass({
    propTypes: {
        loadGroups: React.PropTypes.func,
        loadUsers: React.PropTypes.func,
        loadServices: React.PropTypes.func,
        loadRequest: React.PropTypes.func,
        loadWorkspaces: React.PropTypes.func,
        loadLayes: React.PropTypes.func,
        updateFiltersValues: React.PropTypes.func,
        filtersValues: React.PropTypes.object,
        options: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            updateFiltersValues: () => {},
            filtersValues: {},
            options: {}
        };
    },
    render() {
        return (
            <Panel header="Filters" className="security-filters">
                <Select
                    loadOptions={this.props.loadGroups}
                    onValueUpdated={this.createUpdateFunction('group')}
                    selectedValue={this.props.filtersValues.group}
                    placeholderMsgId={'filters.group'}
                    options={this.props.options.group}/>
                <Select
                    loadOptions={this.props.loadUsers}
                    onValueUpdated={this.createUpdateFunction('user')}
                    selectedValue={this.props.filtersValues.user}
                    placeholderMsgId={'filters.user'}
                    options={this.props.options.user}/>
                <Select
                    loadOptions={this.props.loadServices}
                    onValueUpdated={this.createUpdateFunction('service')}
                    selectedValue={this.props.filtersValues.service}
                    placeholderMsgId={'filters.service'}
                    options={this.props.options.service}/>
                <Select
                    loadOptions={this.props.loadRequest}
                    onValueUpdated={this.createUpdateFunction('request')}
                    selectedValue={this.props.filtersValues.request}
                    placeholderMsgId={'filters.request'}
                    options={this.props.options.request}/>
                <Select loadOptions={this.props.loadWorkspaces}
                    onValueUpdated={this.createUpdateFunction('workspace')}
                    selectedValue={this.props.filtersValues.workspace}
                    placeholderMsgId={'filters.workspace'}
                    options={this.props.options.workspace}/>
                <Select loadOptions={this.props.loadLayes}
                    onValueUpdated={this.createUpdateFunction('layer')}
                    selectedValue={this.props.filtersValues.layer}
                    placeholderMsgId={'filters.layer'}
                    options={this.props.options.layer}/>
            </Panel>
        );
    },
    createUpdateFunction(filterName) {
        const updateFiltersValues = this.props.updateFiltersValues;
        return function(filterValue) {
            updateFiltersValues(filterName, filterValue ? filterValue.value : filterValue);
        };
    }
});

module.exports = Filters;
