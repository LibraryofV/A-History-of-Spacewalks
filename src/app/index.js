import Button from './Button'
import HttpClient from './httpClient'
import React from 'react';
import {render} from 'react-dom';
import List from './List'

const styles = {
  switchCountryRow: {
    textAlign: 'center',
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'calibri',
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

const getCorrectApiUrl = (data) => {
  if(data.first) {
    return 'https://data.nasa.gov/resource/q8u9-7uq7.json'
  } else if (data.second){
    return 'https://data.nasa.gov/resource/q8u9-7uq7.json?country=USA'
  }

  return 'https://data.nasa.gov/resource/q8u9-7uq7.json?country=Russia'
}

const makeRequest = (self) => {
    const request = new HttpClient();
    request.get(self.state.requestURL, (response) => {
        self.setState({
          message: JSON.parse(response)
        })
    });
}

const selectCountryButtonPress = (self, updatedSelection) => {
    const newRequest = getCorrectApiUrl(updatedSelection)

    self.setState({
      selected: updatedSelection,
      requestURL: newRequest,
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
            selected: {first: true, second: false, third: false},
        };
    }

    componentDidMount() {
        const request = new HttpClient();
        request.get('https://data.nasa.gov/resource/q8u9-7uq7.json', (response) => {
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
                              onClick={() => selectCountryButtonPress(this, {first: true, second: false, third: false})}
                              selected={this.state.selected.first}>
                                  <p style={styles.buttonText}>Both</p>
                          </Button>
                          <Button
                              onClick={() => selectCountryButtonPress(this, {first: false, second: true, third: false})}
                              selected={this.state.selected.second}>
                                  <p style={styles.buttonText}>USA</p>
                          </Button>
                          <Button
                              onClick={() => selectCountryButtonPress(this, {first: false, second: false, third: true})}
                              selected={this.state.selected.third}>
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
