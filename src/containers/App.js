import React, {Component} from 'react'
import FilterTable from '../components/FilterTable'

import fieldsJSON from '../mock/fields.json'
import itemsJSON from '../mock/items.json'

export default class App extends Component {

  render() {

    return (
      <div>
        <FilterTable
            tableHeader={ fieldsJSON }
            tableContent={ itemsJSON }
        />
      </div>
    )
  }
}
