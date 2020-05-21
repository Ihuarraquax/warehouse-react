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
import { Route, Switch } from 'react-router-dom';
export default class App extends Component {
  render() {
    return (
      <>
        <Appbar />
        <Switch>
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