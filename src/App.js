import React, { Component } from 'react'
import './App.css';
import Appbar from "./components/Appbar"
import ProductList from "./components/ProductList"
import SingleProduct from "./components/SingleProduct.js"
import ProductForm from "./components/ProductForm"
import ProductLocations from "./components/locations/ProductLocations"
import LocationDetails from "./components/locations/LocationDetails"
import { Route, Switch } from 'react-router-dom';
export default class App extends Component {
  render() {
    return (
      <>
        <Appbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/products/add" component={ProductForm} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route exact path="/products/:id/locations" component={ProductLocations} />
          <Route exact path="/locations/:name" component={LocationDetails} />
        </Switch>
      </>
    );
  }
}