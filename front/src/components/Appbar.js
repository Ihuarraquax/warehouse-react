import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none"
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  }
}));

export default function Appbar(props) {
  const classes = useStyles();
  const { currentUser, showAdminBoard, logOut } = props.data;
  console.log(props.data)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} component={Link} to={"/"}>
            Magazyn App
          </Typography>
          {showAdminBoard && (
            <MenuList className={classes.menu}>
              <MenuItem component={Link} to={"/products"}>Produkty</MenuItem>
              <MenuItem component={Link} to={"/locations"}>Lokacje</MenuItem>
              <MenuItem component={Link} to={"/products/add"}>Dodaj produkt</MenuItem>
              <MenuItem component={Link} to={"/locations/add"}>Dodaj lokacje</MenuItem>
            </MenuList>)}

          {currentUser ? (
            <MenuList className={classes.menu}>
              <MenuItem component={Link} to={"/profile"}>{currentUser.username}</MenuItem>
              <MenuItem component={Link} to={"/login"} onClick={() => { logOut() }}>Wyloguj</MenuItem>
            </MenuList>
          ) : (
              <MenuList className={classes.menu}>
                <MenuItem component={Link} to={"/login"}>Zaloguj</MenuItem>
                <MenuItem component={Link} to={"/register"}>Zarejestruj</MenuItem>
              </MenuList>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}