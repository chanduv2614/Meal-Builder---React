import React, { Component } from 'react';

class navbar extends Component {
    render() { 
        return ( 
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
<a className="navbar-brand" href="#">Meal Builder</a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav nav">
    {this.props.userName !="" && 
    <React.Fragment>
    <li className="nav-item">
      <a className="nav-link" href="#" onClick={()=>this.props.handleNavigation("items")}>Items</a>
    </li>
    
    <li className="nav-item">
      <a className="nav-link" href="#" onClick={()=>this.props.handleNavigation("mymeal")}>
        My Meal<span className="badge badge-pill badge-secondary">{this.props.selectedItemsCount}</span></a>
    </li>
    </React.Fragment>
    }
    {this.props.userName ==="" &&
    <React.Fragment>
    <li className="nav-item">
      <a href="#" className="nav-link" onClick={()=>this.props.handleNavigation("signup")}>
         Sign Up
        </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link" onClick={()=>this.props.handleNavigation("login")}>Login</a>
        </li>
        </React.Fragment>
    }
  </ul>
</div>
<div>
        {this.props.userName!="" && <h3 className="navbar-brand">Hi, {this.props.userName}</h3>}
</div>
</nav>
        );
    }
}
 
export default navbar;