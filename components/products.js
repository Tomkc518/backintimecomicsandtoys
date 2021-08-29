import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    marginTop: 20
  },
  media: {
    height: 140,
  }
});

const Products = ({products}) => {
  const classes = useStyles();
    return (
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" >
      {products.map(product => {
          if (product.availableForSale){
          return (
            <Link href={`/products/${product.id}`} key={`${product.id}`}>
              <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        image={`${product.images[0].src}`}
                        title={product.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h6">
                          {product.title} 
                        </Typography>
                        <Typography>
                          ${product.variants[0].price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          )
          }
        })}
      </Box>
    )
}
export default Products