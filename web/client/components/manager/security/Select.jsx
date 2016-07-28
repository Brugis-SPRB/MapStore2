/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const Select = require('react-select');
const LocaleUtils = require('../../../utils/LocaleUtils');

require('./Security.css');

const SearcheableSelect = React.createClass({
    propTypes: {
        loadOptions: React.PropTypes.func,
        onInputChange: React.PropTypes.func,
        onValueUpdated: React.PropTypes.func,
        options: React.PropTypes.array,
        placeholderMsgId: React.PropTypes.string,
        selectedValue: React.PropTypes.string
    },
    contextTypes: {
        messages: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            loadOptions: () => [],
            onInputChange: () => {},
            onValueUpdated: () => [],
            staticOptions: true
        };
    },
    render() {
        let selectedValue;
        if (this.props.selectedValue) {
            selectedValue = {
                'value': this.props.selectedValue,
                'label': this.props.selectedValue
            };
        }
        return (
            <Select onOpen={this.props.loadOptions}
                onInputChange={this.props.onInputChange}
                options={this.props.options}
                value={selectedValue}
                onChange={this.props.onValueUpdated}
                placeholder={LocaleUtils.getMessageById(this.context.messages, this.props.placeholderMsgId)}/>
        );
    }
});

module.exports = SearcheableSelect;
