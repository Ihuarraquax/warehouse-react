import axios from 'axios';
import authHeader from '../services/auth-header'
const url = window.location.host+"/";

export const fetchProducts = async () => {
  try {
    const { data: { _embedded } } = await axios.get(url + "generated/products", { headers: authHeader() });
    return { products: _embedded.products }
  }//
  catch (error) {
    return {};
  }
}

export const fetchProduct = async (id) => {
  try {
    const { data: product } = await axios.get(url + "generated/products/" + id, { headers: authHeader() });
    const { data: category } = await axios.get(product._links.category.href.slice(0, product._links.category.href.indexOf("{")), { headers: authHeader() });
    const { data: { _embedded } } = await axios.get(product._links.locations.href.slice(0, product._links.locations.href.indexOf("{")), { headers: authHeader() });
    const { locations } = _embedded;
    return { ...product, category, locations };
  }
  catch (error) {
    console.log(error.message)
  }
}

export const deleteProduct = async (product) => {
  console.log(product)
  return await axios.delete(url + "api/products/" + product.name, { headers: authHeader() });
}

export const fetchCategories = async () => {
  const { data: { _embedded } } = await axios.get(url + "generated/categories?projection=categoryForm", { headers: authHeader() });
  const { categories } = _embedded;
  return categories;
}

export const fetchLocation = async (name) => {
  const { data } = await axios.get(url + "api/locations/" + name, { headers: authHeader() });
  return data;
}
export const fetchLocations = async () => {
  const { data } = await axios.get(url + "generated/locations", { headers: authHeader() });

  const { _embedded } = data;
  const { locations } = _embedded;
  return locations;
}

export const addProduct = async (product) => {
  await axios.post(
    url + 'api/products/add',
    product, { headers: authHeader() }
  ).then(res => {
    return res.data;
  }).catch(error => {
    return error.error
  });
}

export const addLocation = async (location) => {

  return await axios.post(url + 'api/locations',
    location, { headers: authHeader() }
  ).then(res => {
    return res;
  }).catch(error => {
    return error.response
  });
}

export const updateLocation = async (location) => {
  axios.post(url + "api/locations",
    {name: location.name, productId: location.productId, count: location.count }, { headers: authHeader() })
}
export const updateProduct = async (product) => {
  const { category, locations, _links, ...fields } = product
  return axios.patch(product._links.self.href,
    fields, { headers: authHeader() })
}