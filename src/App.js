import React, { Component } from 'react'
import './App.css';
import Grid from '@material-ui/core/Grid';
import Appbar from "./components/Appbar"
import ProductList from "./components/ProductList"
export default class App extends Component {
    render() {
        return (
            <>
                <Appbar />
                <Grid container>
                    <Grid item xs={false} md={2} />
                    <ProductList/>
                    <Grid item xs={false} md={2} />
                </Grid>
            </>
        );
    }
}