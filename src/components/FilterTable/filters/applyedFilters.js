import React, {Component, PropTypes} from 'react'
import '../style/style.scss'

export default class ApplyedFilters extends Component {

    static propTypes = {
        dateFilterVisible: PropTypes.bool,
        dateFilterDenyOnClick: PropTypes.func,
        dateInputValue: PropTypes.string,
        stringFilterVisible: PropTypes.bool,
        stringFilterDenyOnClick: PropTypes.func,
        stringInputValue: PropTypes.string
    };

    renderDateFilter = () => {
        const { dateFilterVisible, dateInputValue, dateFilterDenyOnClick } = this.props;

        if (dateFilterVisible) {
            return (
                <div className='applyedFilter'>
                    <div className='applyedFilter__title'>
                        Date filter: {dateInputValue}
                    </div>
                    <div className='applyedFilter__deny' onClick={ dateFilterDenyOnClick }/>
                </div>
            );
        }
    };

    renderStringFilter = () => {
        const { stringFilterVisible, stringInputValue, stringFilterDenyOnClick } = this.props;

        if (stringFilterVisible) {
            return (
                <div className='applyedFilter'>
                    <div className='applyedFilter__title'>
                        String filter: {stringInputValue}
                    </div>
                    <div className='applyedFilter__deny' onClick={ stringFilterDenyOnClick }/>
                </div>
            );
        }
    };

    render() {
        return (
            <div className='applyedFilters__container'>
                <div className='applyedFilters__title'> Applyed filters: </div>
                <div className='applyedFilters__items'>
                    { this.renderDateFilter() }
                    { this.renderStringFilter() }
                </div>
            </div>
        )
    }
}
