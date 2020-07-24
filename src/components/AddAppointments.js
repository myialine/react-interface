import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa'

class AddAppointments extends Component{

    constructor() {
        // @ts-ignore
        super();
        this.state={
            petName: '',
            ownerName: '',
            aptDate: '',
            aptTime: '',
            aptNotes: ''
        }
        this.handleChange =  this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(e){
        e.preventDefault(); // prevents the form from submit and reload the page
        let tempApt ={
            petName: this.state.petName,
            ownerName: this.state.ownerName,
            aptDate: this.state.aptDate + ' ' + this.state.aptTime, //because date and time are combined on the data files
            aptNotes: this.state.aptNotes
        };

        this.props.addAppointment(tempApt);

        this.setState({
            petName: '',
            ownerName: '',
            aptDate: '',
            aptTime: '',
            aptNotes: ''
        });

        this.props.toggleForm();
    }

    handleChange(e){ // this method handles the change in input fields (form)
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div className={
                'card textcenter mt-3 '+
                (this.props.formDisplay ? '': 'add-appointment') //variable to be controlled from the main component
            }>
            <div className="apt-addheading card-header bg-primary text-white"
                onClick={this.props.toggleForm}>
              <FaPlus /> Add Appointment
            </div>
            <div className="card-body">
              <form
                id="aptForm"
                noValidate
                onSubmit={this.handleAdd}
                >
                <div className="form-group form-row">
                  <label
                    className="col-md-2 col-form-label text-md-right"
                    htmlFor="petName"
                    // @ts-ignore
                    readOnly
                  >
                    Pet Name
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      name="petName"
                      placeholder="Pet's Name"
                      value={this.state.petName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label
                    className="col-md-2 col-form-label text-md-right"
                    htmlFor="ownerName"
                  >
                    Pet Owner
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      name="ownerName"
                      placeholder="Owner's Name"
                      value={this.state.ownerName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label
                    className="col-md-2 col-form-label text-md-right"
                    htmlFor="aptDate"
                  >
                    Date
                  </label>
                  <div className="col-md-4">
                    <input
                      type="date"
                      className="form-control"
                      name="aptDate"
                      id="aptDate"
                      value={this.state.aptDate}
                      onChange={this.handleChange}
                    />
                  </div>
                  <label
                    className="col-md-2 col-form-label text-md-right"
                    htmlFor="aptTime"
                  >
                    Time
                  </label>
                  <div className="col-md-4">
                    <input
                      type="time"
                      className="form-control"
                      name="aptTime"
                      id="aptTime"
                      value={this.state.aptTime}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
  
                <div className="form-group form-row">
                  <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                    Apt. Notes
                  </label>
                  <div className="col-md-10">
                    <textarea
                      className="form-control"
                      // @ts-ignore
                      rows="4"
                      // @ts-ignore
                      cols="50"
                      name="aptNotes"
                      id="aptNotes"
                      placeholder="Appointment Notes"
                      value={this.state.aptNotes}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
  
                <div className="form-group form-row mb-0">
                  <div className="offset-md-2 col-md-10">
                    <button
                      type="submit"
                      className="btn btn-primary d-block ml-auto"
                    >
                      Add Appointment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
    }
}
export default AddAppointments;