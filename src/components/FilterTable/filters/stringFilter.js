import React, {Component, PropTypes} from 'react'
import '../style/style.scss'

export default class StringFilter extends Component {

    static propTypes = {
        inputValue: PropTypes.string,
        onApplyClick: PropTypes.func,
        onFilterChange: PropTypes.func
    };

    handleFilterChange = (key, value) => {
        this.props.onFilterChange({
            [key]: value,
        });
    };

    handleSubmitForm = (e) => {
        e.preventDefault();
        this.handleApplyClick();
    };

    handleApplyClick = () => {
        this.props.onApplyClick();
    };

    render() {
        const string = this.props.inputValue;

        return (
            <form onSubmit={ this.handleSubmitForm } className='filter__form'>
                <input
                    type='text'
                    onChange={  (event) => { this.handleFilterChange('stringTerm', event.target.value)}  }
                    placeholder='Enter word'
                    className='filters__field filters__field_string'
                    value={ string }
                />
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
