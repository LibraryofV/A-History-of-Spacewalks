import ListRow from './ListRow'
import React from 'react'

export default class extends React.Component {
    constructor(props) {
        super()

        this.state = {
            rowData: props.rowData
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({rowData: nextProps.rowData})
    }

    render() {
        return (
          <div>
            {this.state.rowData.map((item) => (
                <ListRow item={item}/>
            ))}
          </div>
        )
    }
}
