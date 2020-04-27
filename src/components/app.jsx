import React, { Component } from 'react';
import Navbar from './navbar';
import Items from './items';
import Mymeal from './mymeal';
import mb from '../images/mb.png';
import Login from './login';
import SignUp from './signup';
import Home from './home';
import axios from "axios";


class app extends Component {
    state = { 
        items:[],
        selectedItems:[],
        showItems:false,
        showSelectedItems:false,
        showLogin:false,
        showSignup:false,
        showHome:true,
        loggedUserId:0,
        loggedinUserName:'',
     }

    getapiMealItems(){
        fetch("http://localhost:8081/api/mealitems")
        .then(res => res.json())
        .then(res => this.setResponse(res))
        .catch(err => console.log("error: ",err));
    }

    setResponse(response){
        const _items=response.map(c => {
            c.image=mb;
            return c;
        });
        this.setState({items: _items});
    }
    componentWillMount(){
        this.getapiMealItems();
    }
    
     onAddItemClick=(itemId)=>{
        const selectedItems=this.state.items.filter(a=>a.itemId===itemId);
        this.setState({selectedItems: this.state.selectedItems.concat(selectedItems)});
     }

     onNavigation=(rootname)=>{
        if(rootname === "home"){
            this.setState({showHome:true, showItems : false, showSelectedItems: false, showLogin:false, showSignup:false});
        }else if(rootname === "items"){
            this.setState({ showHome:false, showItems : true, showSelectedItems: false, showLogin:false, showSignup:false});
         }else if(rootname === "mymeal"){
            this.setState({showHome:false, showItems : false, showSelectedItems: true, showLogin:false, showSignup:false});
         }
         else if(rootname === "signup"){
            this.setState({showHome:false, showItems : false, showSelectedItems: false, showLogin:false, showSignup:true});
         }
         else if(rootname === "login"){
            this.setState({showHome:false, showItems : false, showSelectedItems: false, showLogin:true, showSignup:false});
         }
     }

     onRemoveClick=(itemId)=>{
        const selectedItems=this.state.selectedItems.filter(a => a.itemId !== itemId);
        this.setState({selectedItems :selectedItems});
     }

     onCreatedUser=(userid)=>{
        this.setState({loggedUserId: userid});
     }

     onLogin=(username)=>{
        this.setState({loggedinUserName: username});
     }

     onSaveMeal=()=>{
        let _mealItemsIds='';
        for (var index = 0; index < this.state.selectedItems.length; index++) { 
            _mealItemsIds = _mealItemsIds +this.state.selectedItems[index].itemId +", ";
        } 

        const data = {
            'UserId':this.state.loggedUserId.toString(),
            'mealitemsIds':_mealItemsIds.toString(),
           };

           console.log(data);
      
           const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
      
          axios.post('http://localhost:8081/api/saveOrder', data,config)
              .then(res => {
                alert(res.data);
            })
              .catch(err => console.log("error: ",err));
     }
      
      render() {
          return (
                <div>
                    <Navbar handleNavigation={this.onNavigation} 
                            selectedItemsCount={this.state.selectedItems.length}
                            userName={this.state.loggedinUserName}></Navbar>
                    {this.state.showHome && <Home></Home>}
                    {this.state.showItems &&  <Items items={this.state.items} handleClick={this.onAddItemClick}></Items>}
                    {this.state.showSelectedItems && this.state.loggedinUserName != "" && <React.Fragment>
                        <div className="container">
                    <h3>
                        My Meal 
                    </h3>
                    {this.state.selectedItems.map(item => <Mymeal key={item.itemId} selectedItem={item} handleRemoveClick={this.onRemoveClick}></Mymeal>)}
                    <button className="btn btn-primary" onClick={this.onSaveMeal}>Place Order</button>
                    </div>
                    </React.Fragment>
                    }
                    {this.state.showLogin  && <Login handleNavigation={this.onNavigation} handleCheckedUser={this.onLogin}></Login>}
                    {this.state.showSignup && <SignUp handleCreatedUser={this.onCreatedUser}
                    handleNavigation={this.onNavigation}
                    ></SignUp>}
        </div>
      );
        }
}
 
export default app;