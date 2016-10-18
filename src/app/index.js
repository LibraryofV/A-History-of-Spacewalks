import Button from './Button'
import HttpClient from './httpClient'
import R from 'ramda'
import React from 'react'
import {render} from 'react-dom'
import List from './List'
import {
  ALL,
  BASE_URL,
  RUSSIA,
  USA,
} from './apiConstants'

const styles = {
  switchCountryRow: {
    textAlign: 'center',
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'calibri, sans-serif',
    fontSize: 16,
    paddingLeft: 12,
    paddingRight: 12,
  },
  countRow: {
    backgroundColor: '#888',
    marginBottom: 0,
    height: 20,
  }
}

const getCorrectApiUrl = R.cond([
  [R.equals(ALL),   R.always(BASE_URL)],
  [R.equals(USA), R.always(BASE_URL + '?country=USA')],
  [R.equals(RUSSIA), R.always(BASE_URL + '?country=Russia')],
]);

const makeRequest = (self) => {
    const request = new HttpClient();
    request.get(self.state.requestURL, (response) => {
        self.setState({message: JSON.parse(response)})
    });
}

const selectCountryButtonPress = (self, updatedSelection) => {
    self.setState({
      selected: updatedSelection,
      requestURL: getCorrectApiUrl(updatedSelection),
    })

    const request = new HttpClient();
    request.get(newRequest, (response) => {
        self.setState({
          message: JSON.parse(response)
        })
    });
}

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            message: '',
            selected: ALL,
        };
    }

    componentDidMount() {
        const request = new HttpClient();
        request.get(BASE_URL, (response) => {
            this.setState({
              message: JSON.parse(response)
            })
        });
    }

    render() {
        return (
            <div>
              {
                typeof(this.state.message) === 'object' ?
                    <div>
                      <div style={styles.countRow}>
                        <p style={styles.buttonText}>Number of entries found: {this.state.message.length}</p>
                      </div>
                      <div style={styles.switchCountryRow}>
                          <Button
                              onClick={() => selectCountryButtonPress(this, ALL)}
                              selected={this.state.selected === ALL}>
                                  <p style={styles.buttonText}>Both</p>
                          </Button>
                          <Button
                              onClick={() => selectCountryButtonPress(this, USA)}
                              selected={this.state.selected === USA}>
                                  <p style={styles.buttonText}>USA</p>
                          </Button>
                          <Button
                              onClick={() => selectCountryButtonPress(this, RUSSIA)}
                              selected={this.state.selected === RUSSIA}>
                                  <p style={styles.buttonText}>Russia</p>
                          </Button>
                      </div>
                      <List rowData={this.state.message}/>
                    </div>
                    :null
              }
            </div>
        )
    }
}

render(<App/> , document.getElementById('app'));
