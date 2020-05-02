import React, { Component } from 'react';
import Navbar from './navbar';
import Items from './items';
import Mymeal from './mymeal';
import mb from '../images/mb.png';
import Login from './login';
import SignUp from './signup';
import Home from './home';
import axios from "axios";

import img_biryani from '../images/biryani.jpg';
import img_curdrice from '../images/curdrice.jpg';
import img_checkensoup from '../images/chickensoup.jpg';
import img_manchuria from '../images/manchuria.jpg';
import img_cooldrink from '../images/cooldrink.jpg';
import img_icecream from '../images/icecream.jpg';

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
            if(c.category==="rice" && c.itemName ==="Biryani")
                c.image=img_biryani;
            else if(c.category==="rice")
                c.image=img_curdrice;
            else if(c.category==="starter")
                c.image=img_manchuria;
            else if(c.category==="soups & salads")
                c.image=img_checkensoup;
            else if(c.category==="beverage")
                c.image=img_cooldrink;
            else if(c.category==="desert")
                c.image=img_icecream;

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
         }else if(rootname === "logout"){
             this.onLogout();
         }
     }

     onRemoveClick=(itemId)=>{
        const selectedItems=this.state.selectedItems.filter(a => a.itemId !== itemId);
        this.setState({selectedItems :selectedItems});
     }

     onLogin=(userid, username)=>{
        this.setState({loggedUserId: userid});
        this.setState({loggedinUserName: username});
     }

     onLogout=()=>{
        this.setState({items: []});
        this.setState({selectedItems:[]});
        this.setState({loggedUserId: 0});
        this.setState({loggedinUserName: ''});
        this.onNavigation("home");
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
                    <h3 className="text-primary">
                        My Meal 
                    </h3>
                    {this.state.selectedItems.map(item => <Mymeal key={item.itemId} selectedItem={item} handleRemoveClick={this.onRemoveClick}></Mymeal>)}
                    <button className="btn btn-primary" onClick={this.onSaveMeal}>Place Order</button>
                    </div>  
                    </React.Fragment>
                    }
                    {this.state.showLogin  && <Login handleNavigation={this.onNavigation} handleCheckedUser={this.onLogin}></Login>}
                    {this.state.showSignup && <SignUp handleNavigation={this.onNavigation}
                    ></SignUp>}
        </div>
      );
        }
}
 
export default app;