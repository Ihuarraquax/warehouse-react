import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import FilterBar from '../FilterBar'
import { fetchProducts, fetchCategories } from '../../api'
import {FilterContext} from './FilterContext'

export default class ProductList extends Component {


constructor(props){
  super(props);
  this.updateFilter = this.updateFilter.bind(this)
  this.state = {
    data: {},
    loading: true,
    categories: [],
    priceMin: 0,
    priceMax: 9999999,
    update: this.updateFilter
  }
  

}
  async componentDidMount() {
    const data = await fetchProducts();
    const categoriesData = await fetchCategories();
    this.setState({categories: categoriesData.map(c => ({id: c.id, name: c.name, show: true }))})
    this.setState({ data: data });
    this.setState({ loading: false });
  }

  updateFilter(categories, priceMin, priceMax) {
    this.setState({categories: categories});
    this.setState({priceMin: priceMin});
    this.setState({priceMax: priceMax});
  }

  renderProducts = () => {

    const filteredProducts = this.state.data.products.filter((p) => {
      return this.state.categories.find(c => c.name === p.category.name).show
    })
    //console.log(this.state.data.products);
    return filteredProducts.map((p) => (
      <Grid item xs={6} md={4} lg={3} key={p.id}>
        <ProductCard
          id={p.id}
          name={p.name}
          details={p.details}
          category={p.category}
          imagePath={p.imagePath}
          price={p.price}
        />
      </Grid>
    ))
  }

  render() {

    if (this.state.loading) {
      return 'Pobieranie produktów';
    } else {
      if (!this.state.data.products) {
        return "brak produktów"
      }
      return (
        <FilterContext.Provider value={this.state}>
          <Grid container>
            <Grid item xs={false} md={1} />
            <Grid item container spacing={3} xs={12} md={10}>
              {this.renderProducts()}
            </Grid>
            <Grid item xs={false} md={1} />
            <FilterBar />
          </Grid>
        </FilterContext.Provider>
      )
    }
  }
}

