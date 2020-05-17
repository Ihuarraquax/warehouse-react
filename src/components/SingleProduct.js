import React, { Component } from 'react';
import { fetchProduct } from '../api'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

export default class SingleProduct extends Component {

  state = {
    isLoading: true,
    product: {},
  }

  async componentDidMount() {
    const data = await fetchProduct(this.props.match.params.id);
    this.setState({ product: data });
    this.setState({ isLoading: false })

  }

  render() {
    const p = this.state.product;

    if (!this.state.isLoading) {
      if (!p) {
        return "404";
      }
      return (
        <Grid container>
          <Grid item xs={false} md={2} />

          <Grid item container spacing={2} xs={12} md={8}>
            <Grid item xs={12}>
              <Typography variant="h2" color="textPrimary" align="center">
                {p.name}</Typography>
            </Grid>
            <Grid item xs={12} md={4} container>
              <Paper elevation={3}>
                <CardMedia
                  component="img"
                  src={p.imagePath}
                  title={p.name} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                {p.category.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {p.details}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {p.price} zł
              </Typography>
              <Typography variant="overline" display="block">
                {p.locations.map((l) => {
                  return (<p>{l.name}</p>)
                })}
              </Typography>

            </Grid>
          </Grid>

          <Grid item xs={false} md={2} />
        </Grid>
      )
    }
    else {
      return "Ładowanko"
    }
  }
}
