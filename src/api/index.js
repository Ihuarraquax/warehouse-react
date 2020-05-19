import axios from 'axios';

const url = "http://localhost:8080/";

export const fetchProducts = async () => {
  try {
    const { data: { _embedded } } = await axios.get(url + "products");
    return { products: _embedded.products }
  }
  catch (error) {
    return {};
  }
}

export const fetchProduct = async (id) => {
  try {
    const { data: product } = await axios.get(url + "products/" + id);

    const { data: category } = await axios.get(product._links.category.href.slice(0, product._links.category.href.indexOf("{")));
    const { data: { _embedded } } = await axios.get(product._links.locations.href);
    const { locations } = _embedded;

    return { ...product, category, locations };
  }
  catch (error) {
  }
}

export const fetchCategories = async () => {
  const { data: { _embedded } } = await axios.get(url + "categories?projection=categoryForm");
  const { categories } = _embedded;
  return categories;
}

export const fetchLocation = async (name) => {
  const {data} = await axios.get(url + "locations/"+name);
  console.log(data);
  return data;
}

export const addProduct = async (product) => {
  console.log(product);
  axios.post(url + 'products/add',
    product
  ).then(res => {
    return res.data;
  }).catch(error => {
    return error.error
  });
}