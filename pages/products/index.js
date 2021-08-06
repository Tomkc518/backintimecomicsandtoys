import { client } from "../../utils/shopify";
import Layout from '../../components/layout'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const products = (props) => {
  console.log('props', props);
  const classes = useStyles();
    return (
    <Layout menu={props.menu}>
      <Box display="flex">
        {props.products.map(product => {
          if (product.availableForSale){
            return (
              <Card className={classes.root} key={`${product.id}`}>
                <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
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
    </Layout>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const products = await client.product.fetchAll();
    //.then((products) => {
    // Do something with the products
    
  //});
    //const data = await res.json()
  
    // Pass data to the page via props
    return { props: { products: JSON.parse(JSON.stringify(products)) } }
  }

export default products



{/* <div>
{props.products.map(product => {
    return (
    <Link href={`/products/${product.id}`} key={`${product.id}`}>
        <div>
            <p >{product.title}</p>
            <img src={`${product.images[0].src}`} className="productImage"></img>
            <p>{product.description}</p>
        </div>
    </Link>
    )
})}
</div>
<style jsx>{`
.productImage {
max-height: 350px;
max-width: 350px;
}
`}</style> */}