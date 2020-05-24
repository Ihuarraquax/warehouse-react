import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import FilterBar from '../FilterBar'
import { fetchProducts, fetchCategories } from '../../api'
import { FilterContext } from './FilterContext'

export default class ProductList extends Component {


  constructor(props) {
    super(props);
    this.updateCategories = this.updateCategories.bind(this)
    this.updatePriceRange = this.updatePriceRange.bind(this)
    this.changeSorting = this.changeSorting.bind(this)
    this.state = {
      data: {},
      loading: true,
      categories: [],
      priceRange: [0, 10000],
      sortField: '',
      updateCategories: this.updateCategories,
      updatePriceRange: this.updatePriceRange,
      changeSorting: this.changeSorting,
    }


  }
  async componentDidMount() {
    const data = await fetchProducts();
    const categoriesData = await fetchCategories();
    this.setState({ categories: categoriesData.map(c => ({ id: c.id, name: c.name, show: true })) })
    this.setState({ data: data });
    this.setState({ loading: false });
  }

  updateCategories(categories) {
    this.setState({ categories: categories });
  }
  updatePriceRange(priceRange) {
    this.setState({ priceRange: priceRange });
  }
  changeSorting(sortField) {
    this.setState({ sortField: sortField });
  }

  renderProducts = () => {
    const filteredProducts = this.state.data.products.filter((p) => {
      return this.state.categories.find(c => c.name === p.category.name).show
        && p.price > this.state.priceRange[0] && p.price < this.state.priceRange[1]
    })
    var sortedProducts;
    switch (this.state.sortField) {
      case '':
        sortedProducts = filteredProducts;
        break;
      case 'name':
        sortedProducts = filteredProducts.sort((p1, p2) => {
          return p1.name.localeCompare(p2.name)
        })
        break;
      case 'price':
        sortedProducts = filteredProducts.sort((p1, p2) => {
          return p1.price - p2.price;
        })
        break;
      case 'category':
        sortedProducts = filteredProducts.sort((p1, p2) => {
          return p1.category.name.localeCompare(p2.category.name)
        })
        break;
    }
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

