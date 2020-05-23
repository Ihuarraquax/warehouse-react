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
    const { data: { _embedded } } = await axios.get(product._links.locations.href.slice(0, product._links.locations.href.indexOf("{")));
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
  const {data} = await axios.get(url + "api/locations/"+name);
  return data;
}
export const fetchLocations = async () => {
  const {data} = await axios.get(url + "/locations");
  
  const {_embedded} = data;
  const {locations} = _embedded;
  console.log(locations)
  return locations;
}

export const addProduct = async (product) => {
  await axios.post(
    url + 'api/products/add',
    product
  ).then(res => {
    return res.data;
  }).catch(error => {
    return error.error
  });
}

export const addLocation = async (location) => {

  return await axios.post(url + 'api/locations',
    location
  ).then(res => {
    return res;
  }).catch(error => {
    return error.response
  });
}

export const updateLocation = async (location) => {
  axios.patch(url +"locations/"+location.id,
  {count: location.count})
}