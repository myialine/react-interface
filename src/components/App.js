import React, {Component} from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import { without } from 'lodash';

class App extends Component {
  constructor(){
    // @ts-ignore
    super(); //necessary when using inheritance
    this.state = {
      myAppointments: [],
      formDisplay: false, // initialize an empty array
      lastIndex: 0
    }
    this.deleteAppointment = this.deleteAppointment.bind(this); //sets the value of "this" for permanence reasons
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    //optional? Aparently the method did not yield and error
  }

  toggleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay // sets it to the opposite of the current state
    })
  }

  addAppointment(apt){
    let tempApts = this.state.myAppointments; //assign the variable to the new data
    apt.aptId = this.state.lastIndex; // give it a new id based on lastIndex
    tempApts.unshift(apt); //lodash's method to add something to the start of an array
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });

  }

  deleteAppointment(apt){
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt); //lodash in action: returns the record without a given object
    this.setState({
      myAppointments: tempApts
    });
  }

  componentDidMount() {
    fetch('./data.json')
    .then(response => response.json()) // this converts the data to json
    .then(result =>{
      const apts = result.map(item => { //this goes through each item on the data file
        item.aptId =  this.state.lastIndex;
        this.setState({ lastIndex: this.state.lastIndex + 1}) //this is to create an ID while iterating on the list component
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
              <AddAppointments
                formDisplay={this.state.formDisplay} //this is tracking the state of formDisplay
                toggleForm={this.toggleForm}
                addAppointment = {this.addAppointment}
              />
              <SearchAppointments />
              <ListAppointments
              appointments={this.state.myAppointments}
              deleteAppointment={this.deleteAppointment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    );
  }
}

export default App;
