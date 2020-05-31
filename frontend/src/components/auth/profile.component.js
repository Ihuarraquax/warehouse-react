import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import {getOrders} from "../../api";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      orders: []
    };

  }

  async componentDidMount(){
    const {data} = await getOrders(this.state.currentUser.username);
    this.setState({
      orders: data
    })
  }
  render() {
    console.log(this.state.orders)
    const { currentUser } = this.state;
    const { orders } = this.state;
    if(!currentUser){
      return "logowanie";
    }
    
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
<br></br>
        <strong>Zamówienia:</strong>
        <ul>
          {orders && orders.map(o => <li>{o.product.name} : {o.count}</li>)}
        </ul>
        
      </div>
    );
  }
}