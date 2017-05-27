import React, {Component, PropTypes} from 'react'
import './style/style.scss'

import Table from './table/index.js'
import Filters from './filters/index.js'

const defaultDateTerm = {
    year: '',
    month: '',
    day: ''
};

const defaultStringTerm = '';

const stringFieldsArray = [
    'ProjectMeterNumber_fld',
    'gu_WorkflowStartUser',
    'gu_Status'
    ,'CustGenMailingAddress_fld'
];

export default class FilterTable extends Component {

    static propTypes = {
        tableHeader: PropTypes.object,
        tableContent: PropTypes.object
    };

    state = {
        content: this.props.tableContent.items,
        applyedDateFilter: false,
        applyedStringFilter: false,
        filter: {
            stringTerm: defaultStringTerm,
            dateTerm: {
                ...defaultDateTerm
            }
        },
        applyedFilter: {
            stringTerm: defaultStringTerm,
            dateTerm: {
                ...defaultDateTerm
            }
        }
    };

    handleOnChangeStringInput = (filterValue) => {
        this.setState({
            filter: {
                ...this.state.filter,
                stringTerm: filterValue.stringTerm
            }
        });
    };

    handleOnChangeDateInput = (dataFilterValue) => {
        console.log(dataFilterValue, this.state.filter)
        this.setState({
            filter: {
                ...this.state.filter,
                dateTerm: {
                    ...this.state.filter.dateTerm,
                    ...dataFilterValue
                }
            }
        });
    };

    handleFiltration = () => {
        const { applyedStringFilter, applyedDateFilter } = this.state;
        const data = this.props.tableContent.items;

        if (!applyedStringFilter && !applyedDateFilter) { //00
            this.setState({
                content: data,
            });
        }
        if (!applyedStringFilter && applyedDateFilter) { //01
            this.setState({
                content: this.filterDate(data),
            });
        }
        if (applyedStringFilter && !applyedDateFilter) { //10
            this.setState({
                content: this.filterString(data),
            });
        }
        if (applyedStringFilter && applyedDateFilter) { //11
            this.setState({
                content: this.filterDate(this.filterString(data))
            });
        }
    };

    filterDate = (data) => {
        const { year, month, day } = this.state.applyedFilter.dateTerm;
        let regexpStr = '';

        if (year === '' && month === '' && day !== '') { //001
            regexpStr = '([\\d]{4})[-|.|\\|\\s]([\\d]{2})[-|.|\\|\\s](' + day + ')';
        } else
        if (year === '' && month !== '' && day === '') { //010
            regexpStr = '([\\d]{4})[-|.|\\|\\s](' + month + ')[-|.|\\|\\s]([\\d]{2})';
        } else
        if (year === '' && month !== '' && day !== '') { //011
            regexpStr = '([\\d]{4})[-|.|\\|\\s](' + month + ')[-|.|\\|\\s](' + day + ')';
        } else
        if (year !== '' && month === '' && day === '') { //100
            regexpStr = '(' + year + ')[-|.|\\|\\s]([\\d]{2})[-|.|\\|\\s]([\\d]{2})';
        } else
        if (year !== '' && month === '' && day !== '') { //101
            regexpStr = '(' + year + ')[-|.|\\|\\s]([\\d]{2})[-|.|\\|\\s](' + day + ')';
        } else
        if (year !== '' && month !== '' && day === '') { //110
            regexpStr = '(' + year + ')[-|.|\\|\\s](' + month + ')[-|.|\\|\\s]([\\d]{2})';
        } else
        if (year !== '' && month !== '' && day !== '') { //111
            regexpStr = '('+ year +')[-|.|\\|\\s](' + month +')[-|.|\\|\\s](' + day + ')';
        }

        const re = new RegExp(regexpStr);

        return (
            data.filter( (item) => {
                return (
                    re.test(item.Date_Submitted)
                );
            })
        );
    };

    filterString = (data) => {
        const re = new RegExp(this.state.applyedFilter.stringTerm.toLowerCase());

        return data.filter(item => stringFieldsArray.some(element => re.test(item[element].toLowerCase())));
    };

    applyDateFilter = () => {
        this.setState({
            applyedDateFilter: true,
            applyedFilter: {
                ...this.state.applyedFilter,
                dateTerm: {
                    ...this.state.filter.dateTerm
                }
            }
        }, this.handleFiltration);
    };

    applyStringFilter = () => {
        this.setState({
            applyedStringFilter: true,
            applyedFilter: {
                ...this.state.applyedFilter,
                stringTerm: this.state.filter.stringTerm
            }
        }, this.handleFiltration);
    };

    denyDateFilter = () => {
        this.setState({
            applyedDateFilter: false,
            applyedFilter: {
                ...this.state.applyedFilter,
                dateTerm: {
                    ...defaultDateTerm
                }
            },
            filter: {
                ...this.state.filter,
                dateTerm: {
                    ...defaultDateTerm
                }
            }
        }, this.handleFiltration);
    };

    denyStringFilter = () => {
        this.setState({
            applyedStringFilter: false,
            applyedFilter: {
                ...this.state.applyedFilter,
                stringTerm: defaultStringTerm
            },
            filter: {
                ...this.state.filter,
                stringTerm: defaultStringTerm
            }
        }, this.handleFiltration);
    };

    render() {
        const { stringTerm, dateTerm }  = this.state.filter;
        const { year, month, day } = this.state.applyedFilter.dateTerm;
        const string = this.state.applyedFilter.stringTerm;
        const { applyedDateFilter, applyedStringFilter } = this.state;
        const yearValue = year !== '' ? year : '/';
        const monthValue = month !== '' ? month : '/';
        const dayValue = day !== '' ? day : '/';
        const applyedDate = yearValue + '-' + monthValue + '-' + dayValue;
        const applyedString = string !== '' ? string : 'empty';

        console.log(this.state);

        return (
            <div className='main-container'>
              <div className='content'>
                <Filters
                    inputDateValue={ dateTerm }
                    onChangeDate={ this.handleOnChangeDateInput }
                    onClickDate={ this.applyDateFilter }
                    dateFilterVisible={ applyedDateFilter }
                    dateFilterDenyOnClick={ this.denyDateFilter }
                    dateInputValue={ applyedDate }
                    inputStringValue={ stringTerm }
                    onChangeString={ this.handleOnChangeStringInput }
                    onClickString={ this.applyStringFilter }
                    stringFilterVisible={ applyedStringFilter }
                    stringFilterDenyOnClick={ this.denyStringFilter }
                    stringInputValue={ applyedString }
                />
                <Table
                    titles={ this.props.tableHeader.fields }
                    content={ this.state.content }
                />
              </div>
            </div>
        )
  }
}
