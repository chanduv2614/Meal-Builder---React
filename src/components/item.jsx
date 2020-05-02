import React, { Component } from 'react';

class item extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="card" width="40" height="40">
                <img className="card-img-top" width="20" height="60" src={this.props.mealItem.image} alt="Card image cap" />
                    <div className="card-body">
                        <p className="card-title text-primary"><strong>Name:</strong> {this.props.mealItem.itemName}</p>
                        <p className="card-text text-primary"><strong>Price:</strong> {this.props.mealItem.itemPrice}</p>
                        <a href="#" className="btn btn-primary" onClick={()=> this.props.handleAddClick(this.props.mealItem.itemId)}>Add</a>
                    </div>
            </div>
         );
    }
}
 
export default item;