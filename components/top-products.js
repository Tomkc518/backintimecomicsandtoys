import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const TopProducts = (props) => {
  const classes = useStyles();
    return (
      <Box display="flex" justifyContent="space-evenly">
      {props.products.map(product => {
          if (product.availableForSale){
          return (
            <Card className={classes.root} key={`${product.id}`}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    image={`${product.images[0].src}`}
                    title={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {product.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    <Link href="/">Back</Link>
                </Button>
                <Button size="small" color="primary">
                <Link href={`/products/${product.id}`}>Product Info</Link>
                </Button>
            </CardActions>
            </Card>
          )
          }
        })} 
        </Box>
    )
}
export default TopProducts