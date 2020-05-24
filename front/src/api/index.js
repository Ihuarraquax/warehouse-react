import axios from 'axios';
import authHeader from '../services/auth-header'
const url = "http://localhost:8080/";

export const fetchProducts = async () => {
  try {
    const { data: { _embedded } } = await axios.get(url + "products", {headers: authHeader()});
    return { products: _embedded.products }
  }//
  catch (error) {
    return {};
  }
}

export const fetchProduct = async (id) => {
  try {
    const { data: product } = await axios.get(url + "products/" + id, {headers: authHeader()});
    const { data: category } = await axios.get(product._links.category.href.slice(0, product._links.category.href.indexOf("{")), {headers: authHeader()});
    const { data: { _embedded } } = await axios.get(product._links.locations.href.slice(0, product._links.locations.href.indexOf("{")), {headers: authHeader()});
    const { locations } = _embedded;

    return { ...product, category, locations };
  }
  catch (error) {
  }
}

export const fetchCategories = async () => {
  const { data: { _embedded } } = await axios.get(url + "categories?projection=categoryForm", {headers: authHeader()});
  const { categories } = _embedded;
  return categories;
}

export const fetchLocation = async (name) => {
  const {data} = await axios.get(url + "api/locations/"+name, {headers: authHeader()});
  return data;
}
export const fetchLocations = async () => {
  const {data} = await axios.get(url + "locations", {headers: authHeader()});
  
  const {_embedded} = data;
  const {locations} = _embedded;
  return locations;
}

export const addProduct = async (product) => {
  await axios.post(
    url + 'api/products/add',
    product, {headers: authHeader()}
  ).then(res => {
    return res.data;
  }).catch(error => {
    return error.error
  });
}

export const addLocation = async (location) => {

  return await axios.post(url + 'api/locations',
    location, {headers: authHeader()}
  ).then(res => {
    return res;
  }).catch(error => {
    return error.response
  });
}

export const updateLocation = async (location) => {
  axios.patch(url +"locations/"+location.id,
  {count: location.count}, {headers: authHeader()})
}