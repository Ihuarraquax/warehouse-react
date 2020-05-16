import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import { fetchProducts } from '../api'

export default class ProductList extends Component {

  state = {
    data: {},
  }

  async componentDidMount() {
    const data = await fetchProducts();
    console.log(data);

    this.setState({ data: data })
  }
  createProducts = () => {

  }

  render() {
    const products = this.state.data.products;
    console.log(products);
    if (!products) {
      return 'Pobieranie produktów';
    } else {
      return (
        <Grid item container spacing={3} xs={12} md={8}>

          {products.map((p) => {
            return <Grid item xs={6} md={4} lg={3}>
              <Product
                name={p.name}
                details={p.details}
                categories={p.categories}
                imagePath={p.imagePath}
                price={p.price}
              />
            </Grid>
          })}

          <Grid item xs={6} md={4} lg={3}>
            <Product
              name="SAMSUNG GALAXY S20 PLUS SM-G985 128GB SZARY"
              details="Samsung Galaxy S20+ to smukły smartfon, który świetnie leży w dłoni. Ma zmniejszone ramki, bardzo mały, centralnie położony otwór na przedni aparat oraz większy od swego poprzednika ekran. Dzięki zastosowaniu najnowszych materiałów, zyskał większą trwałość. Zarówno przód, jak i tył urządzenia pokrywa szkło Gorilla Glass 6 generacji. Ramkę wykonano z jednolitego stopu stali, który jest dużo bardziej odporny na trudy codziennego użytkowania. Dodatkowo Galaxy S20+ jest odporny na wodę i pył co jest potwierdzone certyfikatem IP68*."
              category="Elektronika"
              imagePath="https://image.ceneostatic.pl/data/products/50656708/i-microsoft-xbox-one-s-1tb-bialy.jpg"
              price="980.55zł"
            />
          </Grid>
        </Grid>
      )
    }
  }
}

