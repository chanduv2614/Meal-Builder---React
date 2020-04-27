import React, { Component } from 'react';
import Item from './item';

class items extends Component {
state={
    riceItems:[],
    starterItems:[],
    soupsItems:[],
    beverageItems:[],
    desertItems:[],
}

componentWillMount(){
    this.setState({riceItems: this.props.items.filter(a => a.category==="rice")});
    this.setState({starterItems: this.props.items.filter(a => a.category==="starter")});
    this.setState({soupsItems: this.props.items.filter(a => a.category==="soups & salads")});
    this.setState({beverageItems: this.props.items.filter(a => a.category==="beverage")});
    this.setState({desertItems: this.props.items.filter(a => a.category==="desert")})
}

    render() { 
        return ( 
                <div className="container">
                    {this.state.riceItems.length > 0 &&
                    <React.Fragment>
                    <div className="row">
                        <h5 className="text-primary">Rice Items</h5>
                    </div>
                    <div className="row">
                    {this.state.riceItems.map(items=>
                        <Item key={items.itemId} mealItem={items} handleAddClick={this.props.handleClick}></Item>
                        )}
                    </div>
                    <hr/>
                    </React.Fragment>
                    }

{this.state.starterItems.length > 0 &&
                    <React.Fragment>
                    <div className="row">
                        <h5 className="text-primary">Starter Items</h5>
                    </div>
                    <div className="row">
                    {this.state.starterItems.map(items=>
                        <Item key={items.itemId} mealItem={items} handleAddClick={this.props.handleClick}></Item>
                        )}
                    </div>
                    <hr/>
                    </React.Fragment>
                    }

{this.state.soupsItems.length > 0 &&
                    <React.Fragment>
                    <div className="row">
                        <h5 className="text-primary">Soups & Salads Items</h5>
                    </div>
                    <div className="row">
                    {this.state.soupsItems.map(items=>
                        <Item key={items.itemId} mealItem={items} handleAddClick={this.props.handleClick}></Item>
                        )}
                    </div>
                    <hr/>
                    </React.Fragment>
                    }

{this.state.beverageItems.length > 0 &&
                    <React.Fragment>
                    <div className="row">
                        <h5 className="text-primary">Beverage Items</h5>
                    </div>
                    <div className="row">
                    {this.state.beverageItems.map(items=>
                        <Item key={items.itemId} mealItem={items} handleAddClick={this.props.handleClick}></Item>
                        )}
                    </div>
                    <hr/>
                    </React.Fragment>
                    }

{this.state.desertItems.length > 0 &&
                    <React.Fragment>
                    <div className="row">
                        <h5 className="text-primary">Desert Items</h5>
                    </div>
                    <div className="row">
                    {this.state.desertItems.map(items=>
                        <Item key={items.itemId} mealItem={items} handleAddClick={this.props.handleClick}></Item>
                        )}
                    </div>
                    <hr/>
                    </React.Fragment>
                    }
                </div>
                );
    }
}
 
export default items;