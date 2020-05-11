import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Switch, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Default from './components/Default';


export default class App extends Component {
    render() {
        return ( 
            <>
            <Navbar></Navbar>
            <Switch>
                <Route exact path="/" component={ProductList}></Route>
                <Route path="/details" component={Details}></Route>x
                <Route component={Default}></Route>
            </Switch>
            </>
        );
    }
}