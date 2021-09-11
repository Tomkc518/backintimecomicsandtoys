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
          if (product.node.availableForSale){
            return (
              <Link href={`/products/${product.node.id}`} key={`${product.node.id}`}>
                <Card className={classes.root}>
                  <CardActionArea>
                      <CardMedia
                          component="img"
                          height="250"
                          image={`${product.node.variants.edges[0].node.image.originalSrc}`}
                          title={product.node.title}
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h6" component="h6">
                            {product.node.title} 
                          </Typography>
                          <Typography>
                            ${product.node.variants.edges[0].node.priceV2.amount}
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