import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

class login extends Component {
    state = {  
      email: '',
      password:'',
      IsInvalidCredentails:false,
    }

    changeHandler = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
  }

  onLoginUser=()=>{
    const data = {
      'emailaddress':this.state.email.toString(),
      'password':this.state.password.toString(),
     };

     const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    axios.post('http://localhost:8081/api/checkUser', data,config)
        .then(res => {
          if(res.data.username != "nouser"){
            this.props.handleCheckedUser(res.data[0].username);
            this.setState({IsInvalidCredentails: false});
            this.props.handleNavigation("items");
          }
          else{
            this.setState({IsInvalidCredentails: true});
          }
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
                    <h5 className="card-title text-center">login</h5>
                    <div className="form-signin">
                    {this.state.IsInvalidCredentails && <h5 className='text-danger'>Invalid Credentials.</h5>}
                      <div className="form-label-group">
                      <label htmlFor="inputEmail">Email address</label>
                        <input type="email" name="email" className="form-control"
                        value={this.state.email} 
                        onChange={e=>this.changeHandler(e)} 
                        placeholder="Email address" required autoFocus />
                      </div>
        
                      <div className="form-label-group">
                      <label htmlFor="inputPassword">Password</label>
                        <input type="password" name="password" className="form-control"
                        value={this.state.password} 
                        onChange={e=>this.changeHandler(e)} 
                        placeholder="Password" required />
                      </div>
        
                      <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                      </div>
                      <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.onLoginUser}>log me in</button>
                      <hr className="my-4" />
                    </div>
                    <a href="#" className="float-right" onClick={()=>this.props.handleNavigation("signup")}>Create new account</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
         );
    }
}
 
export default login;