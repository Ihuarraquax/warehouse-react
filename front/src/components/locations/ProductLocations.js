import React, { Component } from 'react'
import { fetchProduct } from '../../api'
import Grid from '@material-ui/core/Grid';
import LocationCard from './LocationCard'
export default class ProductLocations extends Component {
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
    if (this.state.isLoading) {
      return "loading";
    }
    const locations = this.state.product.locations
    return (
      <div>
        <Grid container>
          <Grid item xs={false} md={2} />
          <Grid item container spacing={2} xs={12} md={8}>
            {locations.map(l =>
              <Grid key={l.name} item xs={3} md={2}>
                <LocationCard data={l} />
              </Grid>
            )}
          </Grid>
          <Grid item xs={false} md={2} />
        </Grid>
      </div>
    )
  }
}
