import React, {Component, PropTypes} from 'react'
import '../style/style.scss'

import DateFilter from './dateFilter.js'
import StringFilter from './stringFilter.js'
import ApplyedFilters from './applyedFilters.js'

export default class Filters extends Component {

    static propTypes = {
        inputDateValue: PropTypes.object,
        onChangeDate: PropTypes.func,
        onClickDate: PropTypes.func,
        dateFilterVisible: PropTypes.bool,
        dateFilterDenyOnClick: PropTypes.func,
        dateInputValue: PropTypes.string,
        inputStringValue: PropTypes.string,
        onChangeString: PropTypes.func,
        onClickString: PropTypes.func,
        stringFilterVisible: PropTypes.bool,
        stringFilterDenyOnClick: PropTypes.func,
        stringInputValue: PropTypes.string
    };

    render() {
        const {
            inputDateValue,
            onChangeDate,
            onClickDate,
            dateFilterVisible,
            dateFilterDenyOnClick,
            dateInputValue,
            inputStringValue,
            onChangeString,
            onClickString,
            stringFilterVisible,
            stringFilterDenyOnClick,
            stringInputValue
        } = this.props;

        return (
            <div>
                <div className='filters'>
                    <div className='filters__container'>
                        <div className='filters__inner'>
                            <div className='filter__title'> Date filter: </div>
                            <DateFilter
                                inputValue={ inputDateValue }
                                onFilterChange={ onChangeDate }
                                onApplyClick={ onClickDate }
                            />
                        </div>
                        <div className='filters__inner'>
                            <div className='filter__title'> String filter: </div>
                            <StringFilter
                                inputValue={ inputStringValue }
                                onFilterChange={ onChangeString }
                                onApplyClick={ onClickString }
                            />
                        </div>
                    </div>
                </div>
                <div className='applyedFilters'>
                    <ApplyedFilters
                        dateFilterVisible={ dateFilterVisible }
                        dateFilterDenyOnClick={ dateFilterDenyOnClick }
                        dateInputValue={ dateInputValue }
                        stringFilterVisible={ stringFilterVisible }
                        stringFilterDenyOnClick={ stringFilterDenyOnClick }
                        stringInputValue={ stringInputValue }
                    />
                </div>
            </div>
        )
    }
}
