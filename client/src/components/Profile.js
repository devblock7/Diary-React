import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { register } from './UserFunctions';
import axios from 'axios';


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      last_login_date: Date(),
      errors: {},
      description:'',

}
this.onChangeDescription = this.onChangeDescription.bind(this);
this.onChangeDate = this.onChangeDate.bind(this);
this.onSubmit = this.onSubmit.bind(this)
}


  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
    })
  }




  onChangeDescription(e) {
     this.setState({
       description: e.target.value
     });
   }
   onChangeDate(date) {
     this.setState({
       date: date
     });
   }
   onSubmit(e) {
     e.preventDefault()

     const newPost = {
       description: this.state.description,
       data: this.state.date,
     }
    console.log(newPost);

     axios.post('http://localhost:5000/diarypost/add', newPost)
     .then(res=> console.log(res.data));

     window.location = '/Archive';
   }

  render() {

    const divStyle = {
  marginRight: '185px',
};
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-10 mx-auto">
            <h1 className="text-center">Hello {this.state.first_name} in your personal Diary</h1>
          </div>

          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td></tr>
             <tr>
              <td>Last login date</td>
              <td>{this.state.last_login_date}</td>
            </tr>

            </tbody>
          </table>
        </div>

      <div>
            <h3>Create New Log</h3>
            <form onSubmit={this.onSubmit}>

              <div className="form-group" rows="5">
                <label>My notes: </label>

          <textarea className="form-control"
            required value={this.state.description}
            onChange={this.onChangeDescription}
            rows="7" id="comment">
          </textarea>

              </div>
              <div className="form-group  text-right">
                <label style={divStyle}>Set Date: </label>
                <div>

                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>

              <div className="form-group text-right">
                <input type="submit" value="Save Log" className="btn btn-primary" />
              </div>
            </form>
          </div>    </div>
    )
  }
}

export default Profile
