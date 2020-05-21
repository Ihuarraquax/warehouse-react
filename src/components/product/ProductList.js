import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import { fetchProducts } from '../../api'

export default class ProductList extends Component {

  state = {
    data: {},
    loading: true
  }

  async componentDidMount() {
    const data = await fetchProducts();
    this.setState({ data: data })
    this.setState({loading: false});
  }

  render() {
    
    if (this.state.loading) {
      return 'Pobieranie produktów';
    } else {
      if(!this.state.data.products){
        return "brak produktów"
      }
      const products = this.state.data.products;
      console.log(products);
      
      return (
        <Grid container>
          <Grid item xs={false} md={1} />
          <Grid item container spacing={3} xs={12} md={10}>
            {products.map((p) => {
              return <Grid item xs={6} md={4} lg={3} key={p.id}>
                <ProductCard
                  id={p.id}
                  name={p.name}
                  details={p.details}
                  category={p.category}
                  imagePath={p.imagePath}
                  price={p.price}
                />
              </Grid>
            })}
          </Grid>
          <Grid item xs={false} md={1} />
        </Grid>
      )
    }
  }
}

