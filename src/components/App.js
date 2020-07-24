import React, {Component} from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import { result } from 'lodash';

class App extends Component {
  constructor(){
    super(); //necessary when using inheritance
    this.state = {
      myAppointments: [] // initialize an empty array
    }
  }

  componentDidMount() {
    fetch('./data.json')
    .then(response => response.json()) // this converts the data to json
    .then(result =>{
      const apts = result.map(item => { //this goes through each item on the data file
        return item;
      })
      this.setState({
        myAppointments: apts // assign a value to the array dynamically
      });
    });
  }

  render() {
    return(<main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppointments />
              <SearchAppointments />
              <ListAppointments appointments={this.state.myAppointments}/>
            </div>
          </div>
        </div>
      </div>
    </main>
    );
  }
}

export default App;
