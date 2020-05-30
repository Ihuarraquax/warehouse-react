import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, Slider, Typography, ButtonGroup, Button, FormControl, FormGroup, FormControlLabel, FormHelperText, Checkbox } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CategoryIcon from '@material-ui/icons/Category';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SortIcon from '@material-ui/icons/Sort';
import Paper from '@material-ui/core/Paper';

import { FilterContext } from './product/FilterContext'
import Grid from '@material-ui/core/Grid';

export default function FilterBar() {
  const classes = useStyles();
  const [filterBarValue, setFilterBarValue] = React.useState('non-selected');
  const [sliderValue, setsliderValue] = useState([0, 10000]);



  const displayFilterOptions = (categories, priceRange, updateCategories, updatePriceRange, changeSorting) => {
    const handleCategoryChange = (event) => {
      categories.find((c) => { return c.id == event.target.value }).show = event.target.checked
      updateCategories(categories)
    }
    const handlePriceChange = (event, newValue) => {
      setsliderValue(newValue)
    };
    const updatePriceChange = (event, newValue) => {
      updatePriceRange(sliderValue)
    };
    const handleChangeSorting = (value) => {
      changeSorting(value)
    }
    function valuetext(value) {
      return `${value}zł`;
    }
    switch (filterBarValue) {
      case 'non-selected':
        return null;
      case 0:
        return (
          <Paper elevation={10} className={classes.paper} color="primary">
            <FormControl component="fieldset">
              <FormGroup>
                <Grid container
                  justify="center"
                  alignItems="center"
                  direction="row">
                  {categories.map(c => (
                    <Grid item >
                      <FormControlLabel
                        className={classes.checkbox}
                        key={c.id}
                        value={c.id}
                        control={<Checkbox checked={c.show} color="primary" onChange={handleCategoryChange} name={c.name} />}
                        label={c.name}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </FormControl>
          </Paper>
        );
      case 1:
        return (
          <Paper elevation={10} className={classes.paper}>
            <Typography variant="h6" id="range-slider" gutterBottom>
              Cena ({sliderValue[0]} - {sliderValue[1]}zł)
             </Typography>
            <Slider className={classes.slider}
              value={sliderValue}
              onChange={handlePriceChange}
              onChangeCommitted={updatePriceChange}
              aria-labelledby="range-slider"
              min={0}
              max={10000}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper elevation={10} className={classes.paper}>
            <Typography variant="h6" id="range-slider" gutterBottom>
              Sortuj według:
             </Typography>
            <ButtonGroup size="large" aria-label="outlined primary button group" 
            className={classes.sortButtons} fullWidth disableElevation 
            variant="contained" color="primary">
              <Button onClick={() => handleChangeSorting('name')} >Nazwy</Button>
              <Button onClick={() => handleChangeSorting('price')} >Ceny</Button>
              <Button onClick={() => handleChangeSorting('category')} >Kategorii</Button>
            </ButtonGroup>
          </Paper>
        );
    }
  }

  return (
    <FilterContext.Consumer>
      {({ categories, priceRange, updateCategories, updatePriceRange, changeSorting }) => (
        <div className={classes.root}>
          {displayFilterOptions(categories, priceRange, updateCategories, updatePriceRange, changeSorting)}
          <BottomNavigation
            color="primary"
            value={filterBarValue}
            showLabels
            className={classes.bottomNavigation}
            onChange={(event, newValue) => {
              if (newValue == filterBarValue) {
                setFilterBarValue('non-selected');
              } else {
                setFilterBarValue(newValue);
              }
            }}
          >
            <BottomNavigationAction label="Kategorie" icon={<CategoryIcon />} />
            <BottomNavigationAction label="Cena" icon={<AttachMoneyIcon />} />
            <BottomNavigationAction label="Sortuj" icon={<SortIcon />} />
          </BottomNavigation>
        </div>
      )}
    </FilterContext.Consumer>
  );
}
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  paper: {
    textAlign: "center",
    margin: 'auto',
    width: '46%',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  bottomNavigation: {
    margin: 'auto',
    width: '50%',
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    backgroundColor: '#DDDDDD'
  },
  checkbox: {
    paddingLeft: "30px",
    paddingRight: "30px"
  },
  slider: {
    width: "80%"
  },
  sortButtons: {
    paddingBottom: "10px",
    width: '60%'
  }
});