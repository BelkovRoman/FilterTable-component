import React, {Component, PropTypes} from 'react'
import '../style/style.scss'

import Titles from './titles.js'
import Content from './content.js'

export default class Table extends Component {

    static propTypes = {
        titles: PropTypes.array,
        content: PropTypes.array
    };

    render() {
        const { titles, content } = this.props;

        return (
            <div className='table'>
                <Titles data={ titles }/>
                <Content titles={ titles } data={ content }/>
            </div>
        )
    }
}
