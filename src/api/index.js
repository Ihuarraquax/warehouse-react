import axios from 'axios';

const url = "http://localhost:8080/";

export const fetchProducts = async () => {
  try {
    const { data: { _embedded } } = await axios.get(url + "products");
    return { products: _embedded.products }
  }
  catch (error) {

  }
}