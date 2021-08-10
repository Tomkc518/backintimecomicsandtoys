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
import Client from 'shopify-buy/index.unoptimized.umd';

const clientExtended = Client.buildClient({
  domain: 'back-in-time-comics-toys.myshopify.com',
  storefrontAccessToken: '2ef3445070a263a260c0f82cebbff07a'
});

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const products = (props) => {
  const classes = useStyles();
    return (
    <Layout menu={props.menu}>
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
    </Layout>
    )
}

export async function getServerSideProps() {
    const products = await client.product.fetchAll();

    const productsQuery = clientExtended.graphQLClient.query((root) => {
      root.addConnection('products', {args: {first: 10}}, (product) => {
        product.add('title');
        product.add('tags');// Add fields to be returned
        product.add('totalInventory');
      });
    });
    
    // Call the send method with the custom products query
    const productData = await clientExtended.graphQLClient.send(productsQuery).then(({model, data}) => {
      // Do something with the products
      //const result = data.products.edges.filter(edge => edge.tag === 'Bag');
      //const result = data.products.edges.filter(edge => edge.node.tags.some(tag => tag === 'Pokemon'));
      //const tagsSearch = ['Pokemon'];
      //const result = data.products.edges.filter(edge => tagsSearch.includes(edge.node.tags));
      //const result = data.products.edges.filter(edge => edge.node.tags.some(tag => tagsSearch.indexOf(tag) >= 0));
      //console.log("result", JSON.stringify(result));
      //productData = JSON.stringify(data);
      return JSON.stringify(data);
    });

    return { props: { products: JSON.parse(JSON.stringify(products)), productData: productData } }
  }

export default products
