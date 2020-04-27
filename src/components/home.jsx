import React, { Component } from 'react';
import background from '../images/background.jpg';

class home extends Component {
    render() { 
        return ( 
<React.Fragment>
<div className="container">
    <div className="row" >
        <img src={background} width="100%" height="100%"></img>
    </div>
</div>
</React.Fragment>

         );
    }
}
 
export default home;