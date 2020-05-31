import React, { useState, useEffect } from 'react';
import { fetchProduct, deleteProduct, updateProduct,saveOrder } from '../../api'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import LocationCard from "../locations/LocationCard"
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import userService from '../../services/auth.service'
import Slider from '@material-ui/core/Slider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function SingleProduct(props) {


  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [editProduct, setEditProduct] = useState({});
  const [allLocationsCount, setAllLocationsCount] = useState(0);
  const [editWindow, setEditWindow] = useState(false);
  const [user, setUser] = useState(userService.getCurrentUser());
  const [sliderValue, setSliderValue] = useState(0);

  const asyncFetchProduct = async () => {
    setIsLoading(true);
    const data = await fetchProduct(props.match.params.id);
    setProduct(data);
    setEditProduct(data);

    console.log(user)
    if (data.locations) {
      const sum = data.locations.reduce((pv, cv) => pv + cv.count, 0);
      setAllLocationsCount(sum);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    {
      asyncFetchProduct()
    }
  }, [])

  const history = useHistory()
  const handleDelete = () => {
    deleteProduct(product).then(res => {
      if (res.status == 200) {
        history.push("/products")
      } else {
        alert(res.data.message)
      }
    })
  }

  const handleClickOpen = () => {
    setEditWindow(true);
  }
  const handleClose = () => {
    setEditWindow(false)
  }

  const handleEdited = async () => {
    await updateProduct(editProduct).then(res => {
      if (res.status === 200) {
        asyncFetchProduct()
      }
    })

    handleClose();
  }
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  const handleOrder = () => {
    saveOrder({product: product.name, count: sliderValue}, user.username)
  }

  const handleNameChange = (e) => {
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value
    })
  }

  const p = product;
  if (!isLoading) {
    if (!p) {
      return "404";
    }
    return (
      <Grid container>
        <Grid item xs={false} md={2} />
        <Grid item container spacing={2} xs={12} md={8}>
          <Grid item xs={12}>
            <Typography variant="h2" color="textPrimary" align="center">
              {p.name}</Typography>
          </Grid>
          <Grid item xs={12} md={4} container>
            <Paper elevation={3}>
              <CardMedia
                component="img"
                src={p.imagePath}
                title={p.name} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              {p.category.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {p.details}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {p.price} zł
              </Typography>
            <Typography variant="h6" gutterBottom>
              całkowita ilosc: {allLocationsCount}
            </Typography>

            {p.locations.map((l) => {
              return (<LocationCard data={l}></LocationCard>)
            })}

            {user.roles.includes("ROLE_USER") ?
              (<Paper elevation={5}>
                <Typography id="count-slider" gutterBottom>
                  Ilość
                </Typography>
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  aria-labelledby="count-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={allLocationsCount}
                />
                <Button
                  disabled={sliderValue == 0}
                  variant="contained"
                  color={"#152358"}
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleOrder}>
                  Zamów
              </Button>
              </Paper>)


              : (null)}



            <Button
              disabled={allLocationsCount > 0}
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}>
              Usuń
              </Button>

            <Button
              variant="contained"
              color="warning"
              startIcon={<EditIcon />}
              onClick={handleClickOpen}>
              Edytuj
              </Button>

          </Grid>
        </Grid>
        <Grid item xs={false} md={2} />
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={editWindow}>
          <DialogTitle id="customized-dialog-title">
            Edycja
        </DialogTitle>
          <DialogContent dividers>

            <TextField
              label="Nazwa"
              multiline
              rowsMax={4}
              name="name"
              value={editProduct.name}
              onChange={handleNameChange}
            />
            <TextField
              label="Opis"
              multiline
              rowsMax={4}
              name="details"
              value={editProduct.details}
              onChange={handleNameChange}
            />
            <TextField
              label="Link do obrazu"
              name="imagePath"
              value={editProduct.imagePath}
              onChange={handleNameChange}
            />
            <TextField
              label="Cena"
              name="price"
              type='number'
              value={editProduct.price}
              onChange={handleNameChange}
            />




          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleEdited} color="primary">
              Zapisz zmiany
          </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    )
  }
  else {
    return "Ładowanko"
  }
}

