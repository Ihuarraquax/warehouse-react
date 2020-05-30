import React, { useState, useEffect } from "react";

import { TextField, Button, Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import { fetchProducts, addLocation } from "../../api"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function LocationForm() {
  const classes = useStyles();
  const [productsOptions, setProductsOption] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [productId, setProductId] = useState('');
  const [count, setCount] = useState(0);
  const [responseStatus, setResponseStatus] = useState();
  const [responseMessage, setResponseMessage] = useState();

  useEffect(() => {
    async function asyncFetchProducts() {
      const { products } = await fetchProducts();
      const options = products.map((p) =>
        <MenuItem value={p.id}>{p.name}</MenuItem>
      )
      setProductsOption(options);
      setLoading(false);
    }
    asyncFetchProducts();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };
  const handleCountChange = (event) => {
    setCount(event.target.value);
  };

  const onAdd = async () => {
    const location = { name, count, productId }
    var res = await addLocation(location);
    setResponseMessage(res.data.message)
    setResponseStatus(res.status)
    setTimeout(() => {
      setResponseStatus(0)
    }, 5000)
  };

  if (isLoading) {
    return "pobieranie listy produktow"
  }
  return (
    <div>
      <Alert severity="error" style={{ display: responseStatus == 500 ? "block" : "none" }}>
        <AlertTitle>Błąd</AlertTitle>
        {responseMessage}
      </Alert>
      <Alert severity="success" style={{ display: responseStatus == 200 ? "block" : "none" }}>
        <AlertTitle>Sukces</AlertTitle>
        Lokacja dodana pomyślnie
      </Alert>
      <FormControl className={classes.formControl} noValidate autoComplete="off" >
        <TextField label="Nazwa" value={name} onChange={handleNameChange} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="product-select-label">Produkt</InputLabel>
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
      </FormControl>
      <FormControl className={classes.formControl} noValidate autoComplete="off">
        <TextField value={count} label="Ilość" onChange={handleCountChange} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button onClick={onAdd}>Dodaj</Button>
      </FormControl>
    </div>

  )
}
