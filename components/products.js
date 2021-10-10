import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    marginTop: 20
  },
  media: {
    height: 140,
  },
});

const Products = (props) => {

  const classes = useStyles();
    return (
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" >
            {props.products.map(product => {
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
          <Grid container xs={6} pt={3} pr={1} justifyContent="flex-end">
            {
              props.productsState.pageInfo.hasPreviousPage === true &&
              <Button variant="contained" startIcon={<ArrowLeftIcon />} style={{ color: "rgba(255, 255, 255, 0.87)" }} onClick={() => props.loadPreviousPage()}>
                Previous
              </Button>
            }
          </Grid>
          <Grid container xs={6} pt={3} pl={1} justifyContent="flex-start">
            {
              props.productsState.pageInfo.hasNextPage === true &&
              <Button variant="contained" endIcon={<ArrowRightIcon />} style={{ color: "rgba(255, 255, 255, 0.87)" }} onClick={() => props.loadNextPage()}>
                Next
              </Button>
            }
          </Grid>
      </Box>
    )
}
export default Products