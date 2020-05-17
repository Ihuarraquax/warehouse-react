import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  metaDetails: {
    fontWeight: "bold"
  },
});

export default function ProductCard(props) {
  const { id, name, details, category, imagePath, locations, price } = props;
  function reduceText(text, maxValue) {
    if (text.length > maxValue) {
      return text.slice(0, maxValue) + "...";
    } else {
      return text;
    }
  };

  const classes = useStyles();
  return (
    <Card>
      <CardActionArea>
        <CardMedia style={{ heigth: "150px" }}
          component="img"
          src={imagePath}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {reduceText(name, 30)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {reduceText(details, 100)}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p"
            className={classes.metaDetails}>
            Kategoria:{category.name} <br />
                        Cena: {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/products/${id}`}>
          <Button size="small" color="primary">
            Szczegóły
        </Button>
        </Link>
        <Button size="small" color="primary">
          Lokalizacja
        </Button>
      </CardActions>
    </Card>
  );
}

