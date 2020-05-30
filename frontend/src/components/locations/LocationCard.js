import React, { useState  } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  link: {
    textDecoration: "none"
  }
});


export default function LocationCard(props) {
  const [data, setData] = useState(
    props.data
  );

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Link to={`/locations/${data.name}`} className={classes.link}>
        {data.name}
        </Link>
         : {data.count}
      </CardContent>
    </Card>
  )

}
