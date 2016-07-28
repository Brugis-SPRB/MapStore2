/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {Panel, Pagination, Button, Glyphicon} = require('react-bootstrap');
const {BootstrapTable, TableHeaderColumn} = require('react-bootstrap-table');

const filters = ['group', 'user', 'service', 'request', 'workspace', 'layer'];

require('react-bootstrap-table/css/react-bootstrap-table-all.min.css');

const Rules = React.createClass({
    propTypes: {
        getRules: React.PropTypes.func,
        updateRulesPage: React.PropTypes.func,
        rules: React.PropTypes.array,
        rulesCount: React.PropTypes.number,
        rulesPage: React.PropTypes.number,
        filtersValues: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            getRules: () => {},
            updateRulesPage: () => {},
            rules: [],
            rulesCount: 0,
            rulesPage: 1,
            filtersValues: {}
        };
    },
    componentDidMount() {
        this.props.getRules();
    },
    componentWillReceiveProps(newProps) {
        if (!filters.every(filter => this.props.filtersValues[filter] === newProps.filtersValues[filter])
            || this.props.rulesPage !== newProps.rulesPage) {
            this.props.getRules();
        }
    },
    render() {
        const selectRowProp = {
          mode: "checkbox",
          clickToSelect: true,
          bgColor: "rgb(238, 193, 213)"
        };
        return (
            <Panel header="Rules">
                <Button bsSize="small" bsStyle="success" >
                    <Glyphicon glyph="plus"/>
                </Button>
                <Button bsSize="small" bsStyle="danger" >
                    <Glyphicon glyph="minus"/>
                </Button>
                <BootstrapTable
                    data={this.props.rules}
                    selectRow={selectRowProp}
                    striped={true}
                    hover={true}
                    condensed={true}>
                  <TableHeaderColumn dataField="id" isKey={true} hidden={true}/>
                  <TableHeaderColumn dataField="priority" dataSort={true} hidden={true}/>
                  <TableHeaderColumn dataField="roleName">Group</TableHeaderColumn>
                  <TableHeaderColumn dataField="userName">User</TableHeaderColumn>
                  <TableHeaderColumn dataField="service">Service</TableHeaderColumn>
                  <TableHeaderColumn dataField="request">Request</TableHeaderColumn>
                  <TableHeaderColumn dataField="workspace">WorkSpace</TableHeaderColumn>
                  <TableHeaderColumn dataField="layer">Layer</TableHeaderColumn>
                  <TableHeaderColumn dataField="access">Access</TableHeaderColumn>
                </BootstrapTable>
                <Pagination
                    bsSize="small"
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={(this.props.rulesCount / 10) + 1}
                    maxButtons={3}
                    activePage={this.props.rulesPage}
                    onSelect={(event, selectEvent) => this.props.updateRulesPage(selectEvent.eventKey)}/>
            </Panel>
        );
    }
});

module.exports = Rules;
