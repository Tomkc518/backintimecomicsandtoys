import { Client } from "../prismic-configuration";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";

import resolver from "../sm-resolver.js";
import Layout from "../components/layout";
import TopProducts from "../components/top-products";
import { client } from "../utils/shopify"
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

const Home = (props) => {
  const classes = useStyles();
  return (
    <Layout menu={props.menu}>
      {/* <SliceZone {...props} resolver={resolver} />; */}
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
  );
};

// Fetch content from prismic
// export const getStaticProps = useGetStaticProps({
//   client: Client(),
//   apiParams: {
//     uid: 'home'
//   },
//   type: 'home',
//   queryType: 'single'
// });

export async function getServerSideProps() {
  const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3MTU2Nzc0OTMyOA=="
  const topProductCollection = await client.collection.fetchWithProducts(collectionId);
  //console.log('topProductCollection', JSON.stringify(topProductCollection))

  return { props: { products: JSON.parse(JSON.stringify(topProductCollection.products))} }
}

export default Home;
