import React, { Component } from 'react';
import axios from "axios";


class signup extends Component {
    state={
        email: '',
        name: '',
        password:'',
        contact:'',
    }

    changeHandler = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
  }

  onCreateUser=()=>{
    const data = {
      'username':this.state.name.toString(),
      'contactnumber':this.state.contact.toString(),
      'emailaddress':this.state.email.toString(),
      'password':this.state.password.toString(),
     };

     const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios.post('http://localhost:8081/api/createUser', data,config)
        .then(res => {
          this.props.handleCreatedUser(res.data.userid);
          alert("Signup completed successfully. Redirecting to Login.");
          this.props.handleNavigation("login");
      })
        .catch(err => console.log("error: ",err));
    }

    render() { 
        return ( 
            <div className="container">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center">Sign Up</h5>
                    <div className="form-signin">
                    <div className="form-label-group">
                      <label htmlFor="name">User Name</label>
                        <input type="text" name="name" className="form-control"
                        value={this.state.name} 
                        onChange={e=>this.changeHandler(e)} 
                        placeholder="User Name" required autoFocus />
                      </div>

                      <div className="form-label-group">
                      <label htmlFor="contactnumber">Contact Number</label>
                        <input type="text" name="contact"
                        value={this.state.contact} 
                        onChange={this.changeHandler} 
                        className="form-control" placeholder="Contact Number" required />
                      </div>

                      <div className="form-label-group">
                      <label htmlFor="emailaddress">Email address</label>
                        <input type="email" name="email" className="form-control"
                         value={this.state.email} 
                         onChange={this.changeHandler} 
                        placeholder="Email address" required />
                      </div>
        
                      <div className="form-label-group">
                      <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control"
                        value={this.state.password} 
                        onChange={this.changeHandler} 
                        placeholder="Password" required />
                      </div>
        
                      <div className="form-label-group">
                      <label htmlFor="inputPassword">Confirm Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Confirm Password" required />
                      </div>
                      <hr/>
                      <button className="btn btn-lg btn-primary btn-block" onClick={this.onCreateUser}>Register</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         );
    }
}
 
export default signup;