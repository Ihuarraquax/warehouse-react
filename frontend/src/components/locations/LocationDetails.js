import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { fetchLocation, updateLocation, fetchProducts } from "../../api"
import Button from '@material-ui/core/Button';
import {Select, MenuItem} from '@material-ui/core';
const useStyles = makeStyles({
  link: {
    textDecoration: "none"
  }
});

export default function LocationDetails(props) {
  const [location, setLocation] = useState({});
  const [count, setCount] = useState(-1);
  const [newCount, setNewCount] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [productsOptions, setProductsOptions] = useState();
  const [productId, setProductId] = useState('');

  const asyncFetchLocation = async (name) => {
    const location = await fetchLocation(name);
    const { products } = await fetchProducts();

    console.log(location)
    setLocation(location);
    setCount(location.count);
    setNewCount(location.count);
    
    const currentProduct = products.find((p) => location.product.id===p.id)
    setProductId(currentProduct.id)
    const options = products.map((p) =>
      <MenuItem value={p.id}>{p.name}</MenuItem>
    )
    setProductsOptions(options);
    setLoading(false);
  }

  useEffect(() => {
    asyncFetchLocation(props.match.params.name);
  }, [])

  const handleChange = (e) => {
    setNewCount(e.target.value)
  }
  const handleButtonClick = () => {
    const updatedLocation = location;
    updatedLocation.count = newCount;
    updatedLocation.productId = productId;
    updateLocation(updatedLocation);
    setCount(updatedLocation.count)
    setProductId(updatedLocation.productId)
  }
  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };

  if (!loading) {
    return (
      <div>
        {location.name}(aktualny stan: {count}) : <input type="number" value={newCount} onChange={handleChange}></input>
        <Select
          labelId="product-select-label"
          displayEmpty
          onChange={handleProductIdChange}
          value={productId}>
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          {productsOptions}
        </Select>

        <Button variant="contained" disabled={count == newCount&& location.product.id==productId} onClick={handleButtonClick}>
          Zapisz zmiany
      </Button>
      </div>

    )
  }
  else {
    return "loading"
  }
}
