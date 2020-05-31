import axios from 'axios';
import authHeader from '../services/auth-header'
import API_URL from '../Config';

const URL = API_URL + "/";

export const fetchProducts = async () => {
  try {
    const { data: { _embedded } } = await axios.get(URL + "generated/products", { headers: authHeader() });
    return { products: _embedded.products }
  }//
  catch (error) {
    return {};
  }
}

export const fetchProduct = async (id) => {
  try {
    const { data: product } = await axios.get(URL + "generated/products/" + id, { headers: authHeader() });
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
  return await axios.delete(URL + "api/products/" + product.name, { headers: authHeader() });
}

export const fetchCategories = async () => {
  const { data: { _embedded } } = await axios.get(URL + "generated/categories?projection=categoryForm", { headers: authHeader() });
  const { categories } = _embedded;
  return categories;
}

export const fetchLocation = async (name) => {
  const { data } = await axios.get(URL + "api/locations/" + name, { headers: authHeader() });
  return data;
}
export const fetchLocations = async () => {
  const { data } = await axios.get(URL + "generated/locations", { headers: authHeader() });

  const { _embedded } = data;
  const { locations } = _embedded;
  return locations;
}

export const addProduct = async (product) => {
  await axios.post(
    URL + 'api/products/add',
    product, { headers: authHeader() }
  ).then(res => {
    return res.data;
  }).catch(error => {
    return error.error
  });
}

export const addLocation = async (location) => {

  return await axios.post(URL + 'api/locations',
    location, { headers: authHeader() }
  ).then(res => {
    return res;
  }).catch(error => {
    return error.response
  });
}

export const updateLocation = async (location) => {
  axios.post(URL + "api/locations",
    { name: location.name, productId: location.productId, count: location.count }, { headers: authHeader() })
}
export const updateProduct = async (product) => {
  const { category, locations, _links, ...fields } = product
  return axios.patch(product._links.self.href,
    fields, { headers: authHeader() })
}

export const saveOrder = async (order, username) => {
  console.log(order)
  console.log(username)
  return axios.post(URL + `api/user/${username}/orders`,
    order, { headers: authHeader() })
}
export const getOrders = async (username) => {
  console.log(username)
  return axios.get(URL + 'api/orders',
    {
      params: {
        username: username
      },
      headers: authHeader()
    })
}