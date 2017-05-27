import React, {Component, PropTypes} from 'react'
import '../style/style.scss'

export default class Titles extends Component {

    static propTypes = {
        data: PropTypes.array
    };

    renderTitles = (data) => {
        return data.map((dataItem, dataKey) => {
            return (
                <div className='column column-1-8 column__title' key={ dataKey }>
                    { dataItem.caption }
                </div>
            )
        })
    };

    render() {
        const { data } = this.props;

        return (
            <div className='table__header'>
                { this.renderTitles(data) }
            </div>
        )
    }
}
