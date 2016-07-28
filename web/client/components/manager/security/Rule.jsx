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

const Rule = React.createClass({
    propTypes: {
        updateFiltersValues: React.PropTypes.func,
        filtersConfiguration: React.PropTypes.object,
        filtersValues: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            updateFiltersValues: () => {}
        };
    },
    render() {
        const filtersValues = this.props.filtersValues || {};
        const filtersConfiguration = this.props.filtersConfiguration || {};
        return (
            <Panel header="Filter">
                {Object.keys(filtersConfiguration).map((filter) => {
                    return (<Select onValueUpdated={this.createUpdateFunction(filter)}
                                    selectedValue={filtersValues[filter]}
                                    {...filtersConfiguration[filter]}/>);
                })}
            </Panel>
        );
    },
    createUpdateFunction(filterName) {
        const updateFiltersValues = this.props.updateFiltersValues;
        return function(filterValue) {
            updateFiltersValues(filterName, filterValue);
        };
    }
});

module.exports = Rule;
