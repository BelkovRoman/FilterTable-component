import React, {Component, PropTypes} from 'react'
import '../style/style.scss'

export default class Content extends Component {

    static propTypes = {
        titles: PropTypes.array,
        data: PropTypes.array
    };

    renderContent = (titles, data) => {
        if (data.length !== 0) {
            return data.map((dataItem, dataKey) => {
                return (
                    <div className='table__row' key={ dataKey }>
                        {
                            titles.map((titlesItem, titlesKey) => {
                                const field = dataItem[titlesItem.name] !== '' ? dataItem[titlesItem.name] : '-';
                                return (
                                    <div className='column column-1-8 columns__items' key={ titlesKey }>
                                        { field }
                                    </div>
                                )
                            })
                        }
                    </div>
                );
            });
        } else {
            return (
                <h2 className='table__badSearch'>
                    Совпадений не найдено
                </h2>
            )
        }
    };

    render() {
        const { titles, data } = this.props;

        return (
            <div className='table__content'>
                { this.renderContent(titles, data) }
            </div>
        )
    }
}