import React, {Component, PropTypes} from 'react'
import '../style/style.scss'

export default class DateFilter extends Component {

    static propTypes = {
        inputValue: PropTypes.object,
        onFilterChange: PropTypes.func,
        onApplyClick: PropTypes.func
    };

    handleFilterChange = (key, value) => {
        this.props.onFilterChange({
            [key]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleApplyClick();
    };

    handleApplyClick = () => {
        this.props.onApplyClick();
    };

    handleKeyPress = (e) => {
        e.target.value = e.target.value.replace(/[^0-9+]/, '');
    };

    render() {
        const { year, month, day } = this.props.inputValue;

        return (
            <form onSubmit={ this.handleSubmit } className='filter__form'>

                <div className='filter__fields'>
                    <input
                        type='text'
                        maxLength='4'
                        onKeyPress={ this.handleKeyPress }
                        onChange={ (event) => { this.handleFilterChange('year', event.target.value)} }
                        placeholder='Year'
                        className='filters__field filters__field_date'
                        value={ year }
                    />
                    <input
                        type='text'
                        maxLength='2'
                        onKeyPress={ this.handleKeyPress }
                        onChange={  (event) => { this.handleFilterChange('month', event.target.value)}  }
                        placeholder='Month'
                        className='filters__field filters__field_date'
                        value={ month }
                    />
                    <input
                        type='text'
                        maxLength='2'
                        onKeyPress={ this.handleKeyPress }
                        onChange={  (event) => { this.handleFilterChange('day', event.target.value)}  }
                        placeholder='Day'
                        className='filters__field filters__field_date'
                        value={ day }
                    />
                </div>
                <input
                    type='submit'
                    onClick={ this.handleApplyClick }
                    className='filters__button'
                    value='Apply'
                />
            </form>
        )
    }
}
