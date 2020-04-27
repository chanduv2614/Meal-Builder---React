import React, { Component } from 'react';

class mymeal extends Component {
    render() { 
        console.log(this.props.selectedItem);
        return ( 
            <div className="container">
                <div className="row col-xs-4">
                    <div className="col-xs-3">
                    <div className="card" width="30" height="30">
                        <img className="card-img-top" width="20" height="60" src={this.props.selectedItem.image} alt="Card image cap" />
                            <div className="card-body">
                            <p className="card-text">Category: {this.props.selectedItem.category}</p>
                                <p className="card-title">Name: {this.props.selectedItem.itemName}           Price: {this.props.selectedItem.itemPrice} </p>
                            </div>
                    </div>
                    </div>
                    <div className="col-xs-1">
                        <a href="#" className="btn btn-warning float-left" onClick={()=> this.props.handleRemoveClick(this.props.selectedItem.itemId)}>-</a>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default mymeal;