import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText, Checkbox } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CategoryIcon from '@material-ui/icons/Category';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Paper from '@material-ui/core/Paper';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { FilterContext } from './product/FilterContext'
import Grid from '@material-ui/core/Grid';

export default function FilterBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState('non-selected');
  const [showCategories, setShowCategories] = React.useState(true);
  const toggleCategoriesFilter = () => {
    setShowCategories(!showCategories);
  };

  const displayFilterOptions = (categories, priceMin, priceMax, update) => {
    const handleChange = (event) => {
      categories.find((c) => { return c.id == event.target.value }).show = event.target.checked
      update(categories, priceMin, priceMax)
    }
    switch (value) {
      case 'non-selected':
        return null;
      case 0:
        return (
          <Paper elevation={0} className={classes.paper} color="primary">
            <FormControl component="fieldset">
              <FormGroup>
                <Grid container
                 justify="center"
                 alignItems="center"
                 direction="row">
                  {categories.map(c => (
                    <Grid item >
                      <FormControlLabel
                        key={c.id}
                        value={c.id}
                        control={<Checkbox checked={c.show} onChange={handleChange} name={c.name} />}
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
          <Paper elevation={0} >
            Price options
          </Paper>
        );
    }
  }

  return (
    <FilterContext.Consumer>
      {({ categories, priceMin, priceMax, update }) => (
        <div className={classes.root}>
          {displayFilterOptions(categories, priceMin, priceMax, update)}
          <BottomNavigation
            color="primary"
            value={value}
            onChange={(event, newValue) => {
              console.log(`old:${value} new:${newValue}`)
              if (newValue == value) {
                setValue('non-selected');
              } else {
                setValue(newValue);
              }
            }}
            showLabels
          >
            <BottomNavigationAction label="Kategorie" icon={<CategoryIcon />}
            />
            <BottomNavigationAction label="Cena" icon={<AttachMoneyIcon />} />
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
  options: {
    width: "300px",
    height: '100px',
    backgroundColor: "#aaaaaa"
  },
  paper: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textAlign: "center",
    width: "300px",
    margin: 'auto',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  }
});