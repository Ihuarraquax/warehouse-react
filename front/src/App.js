import React, { Component } from 'react'
import './App.css';
import Appbar from "./components/Appbar"
import ProductList from "./components/product/ProductList"
import SingleProduct from "./components/product/SingleProduct.js"
import ProductForm from "./components/product/ProductForm"
import ProductLocations from "./components/locations/ProductLocations"
import LocationDetails from "./components/locations/LocationDetails"
import LocationForm from "./components/locations/LocationForm"
import LocationList from "./components/locations/LocationList"
import MainPage from "./components/MainPage"
import AuthService from "./services/auth.service";
import Login from "./components/auth/login.component";
import Profile from "./components/auth/profile.component";
import Register from "./components/auth/register.component";
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
      logOut: this.logOut
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_MODERATOR")
      });
    }
  }
  logOut() {
    AuthService.logout();
  }

  render() {
    return (
      <>
        <Appbar data={this.state} />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/products/add" component={ProductForm} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route exact path="/products/:id/locations" component={ProductLocations} />
          <Route exact path="/locations" component={LocationList} />
          <Route exact path="/locations/add" component={LocationForm} />
          <Route exact path="/locations/:name" component={LocationDetails} />
        </Switch>

      </>
    );
  }
}