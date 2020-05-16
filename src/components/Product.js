import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    metaDetails: {
        fontWeight: "bold"
    },
});

export default function MediaCard(props) {
    const { name, details, categories, imagePath, locations, price } = props;
    function reduceDetails(text) {
        if (text.length > 100) {
            return text.slice(0, 100) + "...";
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
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {reduceDetails(details)}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" component="p"
                        className={classes.metaDetails}>
                        Kategorie:{categories}
                        Cena: {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Szczegóły
        </Button>
                <Button size="small" color="primary">
                    Lokalizacja
        </Button>
            </CardActions>
        </Card>
    );
}

